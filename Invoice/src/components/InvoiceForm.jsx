import { useState } from 'react'

const PRESET_SERVICES = [
  { name: 'Video UGC Tunggal (15-30 detik)', unitPrice: 1200000 },
  { name: 'UGC Video Bundle (3 Video)', unitPrice: 3000000 },
  { name: 'Sponsorship Feed + Story', unitPrice: 800000 },
  { name: 'Instagram Reels (1 Video)', unitPrice: 500000 },
  { name: 'TikTok Content (1 Video)', unitPrice: 600000 },
  { name: 'Product Photography (5 Foto)', unitPrice: 750000 },
  { name: 'Story Takeover (1 Hari)', unitPrice: 400000 },
]

const BANK_OPTIONS = ['BCA', 'BNI', 'BRI', 'Mandiri', 'Dana', 'GoPay', 'OVO', 'Lainnya']

export default function InvoiceForm({ invoiceData, setInvoiceData }) {
  const [showPresets, setShowPresets] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    sender: true,
    client: true,
    items: true,
    payment: true,
    notes: true,
    signature: true,
  })

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID').format(num)
  }

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleChange = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }))
  }

  // ===== Item handlers =====
  const handleItemChange = (index, field, value) => {
    setInvoiceData(prev => {
      const newItems = [...prev.items]
      if (field === 'unitPrice') {
        const numericValue = value.replace(/[^0-9]/g, '')
        newItems[index] = { ...newItems[index], unitPrice: numericValue ? parseInt(numericValue) : 0 }
      } else if (field === 'qty') {
        const numericValue = value.replace(/[^0-9]/g, '')
        newItems[index] = { ...newItems[index], qty: numericValue ? parseInt(numericValue) : 1 }
      } else {
        newItems[index] = { ...newItems[index], [field]: value }
      }
      return { ...prev, items: newItems }
    })
  }

  const addService = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', qty: 1, unitPrice: 0 }]
    }))
  }

  const removeService = (index) => {
    if (invoiceData.items.length <= 1) return
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const selectPreset = (index, preset) => {
    setInvoiceData(prev => {
      const newItems = [...prev.items]
      newItems[index] = { name: preset.name, qty: 1, unitPrice: preset.unitPrice }
      return { ...prev, items: newItems }
    })
    setShowPresets(null)
  }

  const grandTotal = invoiceData.items.reduce((sum, item) => sum + ((item.qty || 1) * (item.unitPrice || 0)), 0)

  // ===== Section Header Component =====
  const SectionHeader = ({ id, icon, title, subtitle }) => (
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full flex items-center gap-3 cursor-pointer group"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cta/10 to-brand-accent-light flex items-center justify-center shrink-0 group-hover:from-brand-cta/20 transition-all duration-200">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-display font-bold text-sm text-brand-text">{title}</h3>
        {subtitle && <p className="text-[10px] text-brand-muted">{subtitle}</p>}
      </div>
      <svg
        className={`w-4 h-4 text-brand-muted transition-transform duration-300 ${expandedSections[id] ? 'rotate-180' : ''}`}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </button>
  )

  return (
    <div className="space-y-4">
      {/* ===== TOP: Invoice Number & Dates ===== */}
      <div className="bg-brand-card rounded-[var(--radius-card)] shadow-card p-6 sm:p-7 fade-in-up">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cta to-brand-accent flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-brand-text">Buat Invoice</h2>
            <p className="text-xs text-brand-muted">Isi detail invoice di bawah ini</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1.5">No. Invoice</label>
            <input type="text" value={invoiceData.invoiceNumber} onChange={e => handleChange('invoiceNumber', e.target.value)}
              className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm font-medium text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
              placeholder="INV-001" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1.5">Tanggal</label>
            <input type="date" value={invoiceData.date} onChange={e => handleChange('date', e.target.value)}
              className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-accent/40" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1.5">Jatuh Tempo</label>
            <input type="date" value={invoiceData.dueDate} onChange={e => handleChange('dueDate', e.target.value)}
              className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-accent/40" />
          </div>
        </div>
      </div>

      {/* ===== SENDER IDENTITY ===== */}
      <div className="bg-brand-card rounded-[var(--radius-card)] shadow-card p-6 sm:p-7 fade-in-up" style={{ animationDelay: '60ms' }}>
        <SectionHeader id="sender"
          icon={<svg className="w-4 h-4 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
          title="Identitas Pengirim" subtitle="Nama, alamat, kontak pengirim invoice"
        />
        {expandedSections.sender && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Nama / Entitas</label>
              <input type="text" value={invoiceData.senderName} onChange={e => handleChange('senderName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                placeholder="Aesthetic Creator" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Alamat Lengkap</label>
              <textarea value={invoiceData.senderAddress} onChange={e => handleChange('senderAddress', e.target.value)} rows={2}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 resize-none transition-all duration-300 hover:border-brand-accent/40"
                placeholder="Jl. Contoh No. 123, Kota Malang, Jawa Timur 65xxx" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">No. Telepon</label>
                <input type="tel" value={invoiceData.senderPhone} onChange={e => handleChange('senderPhone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                  placeholder="0812-xxxx-xxxx" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Email</label>
                <input type="email" value={invoiceData.senderEmail} onChange={e => handleChange('senderEmail', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                  placeholder="hello@domain.com" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">NPWP <span className="text-brand-muted/50 normal-case">(opsional)</span></label>
              <input type="text" value={invoiceData.senderNpwp} onChange={e => handleChange('senderNpwp', e.target.value)}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                placeholder="xx.xxx.xxx.x-xxx.xxx" />
            </div>
          </div>
        )}
      </div>

      {/* ===== CLIENT IDENTITY ===== */}
      <div className="bg-brand-card rounded-[var(--radius-card)] shadow-card p-6 sm:p-7 fade-in-up" style={{ animationDelay: '120ms' }}>
        <SectionHeader id="client"
          icon={<svg className="w-4 h-4 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>}
          title="Identitas Klien" subtitle="Data perusahaan / brand yang ditagih"
        />
        {expandedSections.client && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Nama Perusahaan / Brand</label>
              <input type="text" value={invoiceData.clientName} onChange={e => handleChange('clientName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                placeholder="PT ABC Indonesia" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Alamat Klien</label>
              <textarea value={invoiceData.clientAddress} onChange={e => handleChange('clientAddress', e.target.value)} rows={2}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 resize-none transition-all duration-300 hover:border-brand-accent/40"
                placeholder="Jl. Sudirman No. 45, Jakarta Selatan 12xxx" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Attn: PIC / Dept. Finance</label>
              <input type="text" value={invoiceData.clientPic} onChange={e => handleChange('clientPic', e.target.value)}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                placeholder="Bapak/Ibu Finance / Nama PIC" />
            </div>
          </div>
        )}
      </div>

      {/* ===== LINE ITEMS ===== */}
      <div className="bg-brand-card rounded-[var(--radius-card)] shadow-card p-6 sm:p-7 fade-in-up" style={{ animationDelay: '180ms' }}>
        <SectionHeader id="items"
          icon={<svg className="w-4 h-4 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>}
          title="Layanan / Line Items" subtitle="Detail layanan, kuantitas, dan harga satuan"
        />
        {expandedSections.items && (
          <div className="mt-4 pl-11">
            {/* Column labels */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-2 mb-2 px-1">
              <div className="col-span-5">
                <span className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Nama Layanan</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Qty</span>
              </div>
              <div className="col-span-4">
                <span className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Harga Satuan</span>
              </div>
              <div className="col-span-1" />
            </div>

            <div className="space-y-3 mb-4">
              {invoiceData.items.map((item, index) => (
                <div key={index} className="fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  {/* Mobile: stacked, Desktop: grid */}
                  <div className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-2 items-start sm:items-center">
                    {/* Service Name */}
                    <div className="w-full sm:col-span-5 relative">
                      <input type="text" value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40 pr-9"
                        placeholder="Nama layanan..." />
                      <button type="button" onClick={() => setShowPresets(showPresets === index ? null : index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-brand-accent-light/50 hover:bg-brand-accent-light flex items-center justify-center transition-all duration-200 cursor-pointer"
                        title="Pilih dari template">
                        <svg className="w-3 h-3 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6,9 12,15 18,9" />
                        </svg>
                      </button>
                      {showPresets === index && (
                        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-brand-accent-light shadow-card-hover overflow-hidden">
                          <div className="px-3 py-2 border-b border-brand-accent-light/40">
                            <span className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Template Layanan</span>
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {PRESET_SERVICES.map((preset, pIdx) => (
                              <button key={pIdx} type="button" onClick={() => selectPreset(index, preset)}
                                className="w-full text-left px-3 py-2 hover:bg-brand-accent-light/30 transition-colors duration-150 flex justify-between items-center gap-2 cursor-pointer">
                                <span className="text-xs font-medium text-brand-text truncate">{preset.name}</span>
                                <span className="text-[10px] font-bold text-brand-accent whitespace-nowrap">Rp {formatRupiah(preset.unitPrice)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Qty */}
                    <div className="w-full sm:col-span-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-brand-muted sm:hidden">QTY:</span>
                        <input type="text" value={item.qty || 1} onChange={e => handleItemChange(index, 'qty', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm font-semibold text-brand-text text-center transition-all duration-300 hover:border-brand-accent/40"
                          placeholder="1" />
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="w-full sm:col-span-4 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-brand-muted">Rp</span>
                      <input type="text" value={item.unitPrice ? formatRupiah(item.unitPrice) : ''}
                        onChange={e => handleItemChange(index, 'unitPrice', e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm font-semibold text-brand-text text-right placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                        placeholder="0" />
                    </div>

                    {/* Remove */}
                    <div className="sm:col-span-1 flex justify-end sm:justify-center w-full sm:w-auto">
                      <button type="button" onClick={() => removeService(index)} disabled={invoiceData.items.length <= 1}
                        className={`w-8 h-8 sm:w-full sm:h-[42px] rounded-lg border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                          invoiceData.items.length <= 1
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                            : 'border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300 hover:text-red-500'
                        }`} title="Hapus">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3,6 5,6 21,6" />
                          <path d="M19,6v14a2,2,0,01-2,2H7a2,2,0,01-2-2V6m3,0V4a2,2,0,012-2h4a2,2,0,012,2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Line item subtotal */}
                  {(item.qty > 1 && item.unitPrice > 0) && (
                    <div className="text-right mt-1 pr-10 sm:pr-12">
                      <span className="text-[10px] text-brand-muted">
                        Subtotal: <span className="font-semibold text-brand-accent">Rp {formatRupiah((item.qty || 1) * item.unitPrice)}</span>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Service Button */}
            <button type="button" onClick={addService}
              className="w-full py-2.5 rounded-[var(--radius-btn)] border-2 border-dashed border-brand-accent-light hover:border-brand-accent/50 hover:bg-brand-accent-light/20 text-sm font-semibold text-brand-accent transition-all duration-300 flex items-center justify-center gap-2 mb-5 cursor-pointer group">
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Tambah Layanan
            </button>

            {/* Grand Total */}
            <div className="bg-gradient-to-r from-brand-accent-light/30 via-brand-badge-bg/40 to-brand-accent-light/30 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-brand-text">Total</span>
                <span className="font-display font-extrabold text-xl text-brand-cta">
                  Rp {formatRupiah(grandTotal)}
                </span>
              </div>
              {invoiceData.items.length > 1 && (
                <p className="text-[10px] text-brand-muted mt-1">
                  {invoiceData.items.filter(i => i.unitPrice > 0).length} layanan • {invoiceData.items.reduce((s, i) => s + (i.qty || 1), 0)} item total
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===== PAYMENT DETAILS ===== */}
      <div className="bg-brand-card rounded-[var(--radius-card)] shadow-card p-6 sm:p-7 fade-in-up" style={{ animationDelay: '240ms' }}>
        <SectionHeader id="payment"
          icon={<svg className="w-4 h-4 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
          title="Detail Rekening Pembayaran" subtitle="Informasi bank untuk transfer dana"
        />
        {expandedSections.payment && (
          <div className="mt-4 space-y-3 pl-11">
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Nama Bank</label>
              <select value={invoiceData.bankName} onChange={e => handleChange('bankName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm font-medium text-brand-text transition-all duration-300 hover:border-brand-accent/40 cursor-pointer appearance-none">
                {BANK_OPTIONS.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Nomor Rekening</label>
              <input type="text" value={invoiceData.bankAccount} onChange={e => handleChange('bankAccount', e.target.value)}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm font-medium text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                placeholder="1234567890" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Atas Nama (A/N)</label>
              <input type="text" value={invoiceData.bankHolder} onChange={e => handleChange('bankHolder', e.target.value)}
                className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm font-medium text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                placeholder="Nama pemilik rekening" />
            </div>
          </div>
        )}
      </div>

      {/* ===== NOTES & SIGNATURE ===== */}
      <div className="bg-brand-card rounded-[var(--radius-card)] shadow-card p-6 sm:p-7 fade-in-up" style={{ animationDelay: '300ms' }}>
        {/* Notes */}
        <SectionHeader id="notes"
          icon={<svg className="w-4 h-4 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>}
          title="Catatan & Syarat" subtitle="Keterangan pembayaran atau T&C"
        />
        {expandedSections.notes && (
          <div className="mt-4 pl-11 mb-6">
            <textarea value={invoiceData.notes} onChange={e => handleChange('notes', e.target.value)} rows={3}
              className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 resize-none transition-all duration-300 hover:border-brand-accent/40"
              placeholder="Catatan pembayaran, syarat & ketentuan..." />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[
                'Mohon lakukan pembayaran penuh sebelum tanggal jatuh tempo ke rekening yang tertera di bawah. Terima kasih atas kerja samanya.',
                'Pembayaran dilakukan secara bertahap: 50% DP di awal, 50% pelunasan setelah konten selesai.',
                'Invoice ini berlaku sebagai bukti penagihan sah. Harap sertakan nomor invoice pada bukti transfer.',
              ].map((template, i) => (
                <button key={i} type="button" onClick={() => handleChange('notes', template)}
                  className="text-[10px] font-medium bg-brand-accent-light/40 text-brand-badge-text px-2.5 py-1 rounded-full hover:bg-brand-accent-light transition-colors duration-200 cursor-pointer">
                  Template {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-brand-accent-light to-transparent my-2" />

        {/* Signature */}
        <div className="mt-4">
          <SectionHeader id="signature"
            icon={<svg className="w-4 h-4 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 000 4h4v-4h-4z"/></svg>}
            title="Pengesahan / Tanda Tangan" subtitle="Nama terang dan jabatan penandatangan"
          />
          {expandedSections.signature && (
            <div className="mt-4 space-y-3 pl-11">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Nama Terang</label>
                  <input type="text" value={invoiceData.signatureName} onChange={e => handleChange('signatureName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                    placeholder="Nama lengkap" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-wider mb-1">Jabatan</label>
                  <input type="text" value={invoiceData.signatureTitle} onChange={e => handleChange('signatureTitle', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-input)] border border-brand-accent-light/60 bg-brand-card-alt text-sm text-brand-text placeholder-brand-muted/50 transition-all duration-300 hover:border-brand-accent/40"
                    placeholder="Content Creator / Owner" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
