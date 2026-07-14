import { useState } from 'react'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function getDueDate() {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return d.toISOString().split('T')[0]
}

const DEFAULT_NOTES = `Mohon lakukan pembayaran penuh sebelum tanggal jatuh tempo ke rekening yang tertera di bawah. Terima kasih atas kerja samanya.`

export default function App() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-001',
    date: getToday(),
    dueDate: getDueDate(),

    // Sender identity
    senderName: 'Aesthetic Creator',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
    senderNpwp: '',

    // Client identity
    clientName: '',
    clientAddress: '',
    clientPic: '',

    // Line items with qty & unit price
    items: [{ name: '', qty: 1, unitPrice: 0 }],

    // Payment details
    bankName: 'BCA',
    bankAccount: '',
    bankHolder: '',

    // Notes
    notes: DEFAULT_NOTES,

    // Signature
    signatureName: '',
    signatureTitle: '',
  })

  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-brand-bg/80 border-b border-brand-accent-light/30">
        <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-cta to-brand-accent flex items-center justify-center shadow-sm">
              <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
            </div>
            <div>
              <h1 className="font-display font-bold text-base sm:text-lg text-brand-text leading-tight">
                Invoice Generator
              </h1>
              <p className="text-[10px] sm:text-xs text-brand-muted hidden sm:block">Aesthetic Creator • Invoice Builder</p>
            </div>
          </div>

          {/* Mobile Preview Toggle */}
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer bg-brand-accent-light text-brand-badge-text hover:bg-brand-badge-bg"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showPreview ? (
                <>
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
            {showPreview ? 'Edit Form' : 'Preview'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div data-main-grid className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left: Form */}
          <div data-form-panel className={`${showPreview ? 'hidden lg:block' : 'block'}`}>
            <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
          </div>

          {/* Right: Preview */}
          <div data-preview-panel className={`lg:sticky lg:top-24 ${showPreview ? 'block' : 'hidden lg:block'}`}>
            <InvoicePreview invoiceData={invoiceData} />
          </div>
        </div>
      </main>

      {/* Decorative Blobs */}
      <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-brand-accent-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -top-20 -right-20 w-48 h-48 bg-brand-peach/15 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}
