import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export default function InvoicePreview({ invoiceData }) {
  const previewRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID').format(num)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const grandTotal = invoiceData.items.reduce((sum, item) => sum + ((item.qty || 1) * (item.unitPrice || 0)), 0)
  const hasContent = invoiceData.items.some(item => item.name || item.unitPrice > 0)

  // ===== PDF EXPORT (html2canvas screenshot → jsPDF) =====
  const handleExportPDF = async () => {
    if (!previewRef.current) return
    setIsExporting(true)

    try {
      // Capture the preview card as a canvas
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        allowTaint: true,
        removeContainer: true,
      })

      const imgData = canvas.toDataURL('image/png')

      // Create PDF with A4 dimensions
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // Calculate image dimensions to fit A4 with margins
      const margin = 10
      const maxWidth = pdfWidth - margin * 2
      const imgRatio = canvas.height / canvas.width
      const imgWidth = maxWidth
      const imgHeight = imgWidth * imgRatio

      // Center horizontally, place at top with margin
      const xOffset = margin
      const yOffset = margin

      // If image is taller than page, scale it down
      if (imgHeight > pdfHeight - margin * 2) {
        const scaledHeight = pdfHeight - margin * 2
        const scaledWidth = scaledHeight / imgRatio
        const scaledX = (pdfWidth - scaledWidth) / 2
        pdf.addImage(imgData, 'PNG', scaledX, margin, scaledWidth, scaledHeight)
      } else {
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight)
      }

      pdf.save(`${invoiceData.invoiceNumber || 'invoice'}.pdf`)
    } catch (err) {
      console.error('Export PDF failed:', err)
      // Fallback: open print dialog
      window.print()
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="slide-in-right">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 no-print">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">Live Preview</span>
        </div>
        <button type="button" onClick={handleExportPDF} disabled={isExporting || !hasContent}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer ${
            isExporting || !hasContent
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-brand-cta to-brand-accent text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
          }`}>
          {isExporting ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="42" strokeDashoffset="14" />
              </svg>
              Mengekspor...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export PDF
            </>
          )}
        </button>
      </div>

      {/* ===== INVOICE PREVIEW CARD ===== */}
      <div ref={previewRef} data-invoice-card className="bg-white rounded-[var(--radius-card)] shadow-card overflow-hidden text-[13px] max-w-[800px] mx-auto w-full">
        {/* Header Band */}
        <div className="relative bg-gradient-to-r from-[#C96B7A] via-[#D4838F] to-[#F2C4B3] px-7 py-7 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/8" />
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h1 className="font-display font-extrabold text-xl text-white tracking-tight">INVOICE</h1>
              <p className="text-white/70 text-[11px] font-medium mt-0.5">{invoiceData.senderName || 'Aesthetic Creator'}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-sm">{invoiceData.invoiceNumber || 'INV-XXX'}</p>
              <p className="text-white/70 text-[11px] mt-0.5">{formatDate(invoiceData.date)}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {/* ===== FROM / TO ===== */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Sender */}
            <div>
              <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Dari</p>
              <p className="font-display font-bold text-sm text-brand-text">{invoiceData.senderName || 'Aesthetic Creator'}</p>
              {invoiceData.senderAddress && (
                <p className="text-[11px] text-brand-muted mt-0.5 leading-relaxed whitespace-pre-line">{invoiceData.senderAddress}</p>
              )}
              {invoiceData.senderPhone && (
                <p className="text-[11px] text-brand-muted mt-0.5">Tel: {invoiceData.senderPhone}</p>
              )}
              {invoiceData.senderEmail && (
                <p className="text-[11px] text-brand-muted mt-0.5">{invoiceData.senderEmail}</p>
              )}
              {invoiceData.senderNpwp && (
                <p className="text-[10px] text-brand-muted mt-1 font-medium">NPWP: {invoiceData.senderNpwp}</p>
              )}
            </div>

            {/* Client */}
            <div>
              <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Ditagihkan Kepada</p>
              <p className="font-display font-bold text-sm text-brand-text">{invoiceData.clientName || 'Nama Client'}</p>
              {invoiceData.clientAddress && (
                <p className="text-[11px] text-brand-muted mt-0.5 leading-relaxed whitespace-pre-line">{invoiceData.clientAddress}</p>
              )}
              {invoiceData.clientPic && (
                <p className="text-[11px] text-brand-muted mt-0.5 font-medium">Attn: {invoiceData.clientPic}</p>
              )}
              {invoiceData.dueDate && (
                <div className="mt-2">
                  <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest">Jatuh Tempo</p>
                  <p className="text-xs font-semibold text-brand-text mt-0.5">{formatDate(invoiceData.dueDate)}</p>
                </div>
              )}
            </div>
          </div>

          {/* ===== TABLE ===== */}
          <div className="mb-6">
            {/* Header */}
            <div className="grid grid-cols-12 gap-1 px-3 py-2 bg-brand-accent-light/30 rounded-lg mb-1.5">
              <div className="col-span-1"><span className="text-[9px] font-bold text-brand-muted uppercase">#</span></div>
              <div className="col-span-4"><span className="text-[9px] font-bold text-brand-muted uppercase">Layanan</span></div>
              <div className="col-span-2 text-center"><span className="text-[9px] font-bold text-brand-muted uppercase">Qty</span></div>
              <div className="col-span-2 text-right"><span className="text-[9px] font-bold text-brand-muted uppercase">Harga Satuan</span></div>
              <div className="col-span-3 text-right"><span className="text-[9px] font-bold text-brand-muted uppercase">Jumlah</span></div>
            </div>
            {/* Rows */}
            <div className="divide-y divide-brand-accent-light/25">
              {invoiceData.items.map((item, index) => {
                const qty = item.qty || 1
                const lineTotal = qty * (item.unitPrice || 0)
                return (
                  <div key={index} className="grid grid-cols-12 gap-1 px-3 py-2.5 items-center">
                    <div className="col-span-1"><span className="text-[11px] text-brand-muted">{index + 1}</span></div>
                    <div className="col-span-4">
                      <p className="text-[12px] font-medium text-brand-text leading-snug">
                        {item.name || <span className="text-brand-muted/40 italic">Belum diisi</span>}
                      </p>
                    </div>
                    <div className="col-span-2 text-center"><span className="text-[12px] text-brand-text">{qty}</span></div>
                    <div className="col-span-2 text-right">
                      <span className="text-[12px] text-brand-text">
                        {item.unitPrice > 0 ? `Rp ${formatRupiah(item.unitPrice)}` : '—'}
                      </span>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="text-[12px] font-semibold text-brand-text">
                        {lineTotal > 0 ? `Rp ${formatRupiah(lineTotal)}` : '—'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ===== TOTAL ===== */}
          <div className="border-t-2 border-dashed border-brand-accent-light pt-4 mb-6">
            <div className="flex justify-between items-center bg-gradient-to-r from-brand-accent-light/20 via-brand-badge-bg/30 to-brand-accent-light/20 rounded-xl px-4 py-3">
              <span className="text-xs font-bold text-brand-text uppercase tracking-wide">Total</span>
              <span className="font-display font-extrabold text-lg text-brand-cta">
                Rp {formatRupiah(grandTotal)}
              </span>
            </div>
          </div>

          {/* ===== NOTES ===== */}
          {invoiceData.notes && (
            <div className="mb-6">
              <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Catatan</p>
              <div className="bg-brand-card-alt rounded-lg p-3 border border-brand-accent-light/30">
                <p className="text-[11px] text-brand-muted leading-relaxed whitespace-pre-line">{invoiceData.notes}</p>
              </div>
            </div>
          )}

          {/* ===== PAYMENT & SIGNATURE ROW ===== */}
          <div className="border-t border-brand-accent-light/30 pt-5">
            <div className="grid grid-cols-2 gap-6">
              {/* Payment Details */}
              <div>
                <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-2">Detail Pembayaran</p>
                <div className="bg-brand-card-alt rounded-lg p-3 border border-brand-accent-light/30 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[10px] text-brand-muted">Bank</span>
                    <span className="text-[11px] font-semibold text-brand-text">{invoiceData.bankName || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-brand-muted">No. Rek</span>
                    <span className="text-[11px] font-semibold text-brand-text">{invoiceData.bankAccount || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-brand-muted">A/N</span>
                    <span className="text-[11px] font-semibold text-brand-text">{invoiceData.bankHolder || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Signature */}
              <div>
                <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-2">Pengesahan</p>
                <div className="rounded-lg p-3 border border-brand-accent-light/30 text-center h-[calc(100%-20px)] flex flex-col justify-between">
                  {/* Signature space */}
                  <div className="flex-1 min-h-[36px]" />
                  {/* Signature line */}
                  <div className="border-t border-brand-muted/30 mx-4 pt-2">
                    <p className="font-display font-bold text-xs text-brand-text">
                      {invoiceData.signatureName || invoiceData.senderName || '________________'}
                    </p>
                    {invoiceData.signatureTitle && (
                      <p className="text-[10px] text-brand-muted mt-0.5">{invoiceData.signatureTitle}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== FOOTER BRANDING ===== */}
          <div className="mt-5 pt-3 border-t border-brand-accent-light/20 flex items-center justify-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-brand-cta to-brand-accent" />
            <span className="text-[10px] font-semibold text-brand-muted">{invoiceData.senderName || 'Aesthetic Creator'} • Terima kasih! 💕</span>
          </div>
        </div>
      </div>
    </div>
  )
}
