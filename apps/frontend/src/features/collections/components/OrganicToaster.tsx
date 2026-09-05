import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { toastManager } from '../lib/toast'

function ToastList() {
    const { toasts } = ToastPrimitive.useToastManager()

    return toasts.map((t) => (
        <ToastPrimitive.Root key={t.id} toast={t} className="card elev-lg organic-toast">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div>
                    <ToastPrimitive.Title className="card-title" style={{ fontSize: 14 }} />
                    {t.description && <ToastPrimitive.Description className="card-meta" style={{ marginTop: 2 }} />}
                </div>
                <ToastPrimitive.Close
                    aria-label="Fermer"
                    className="btn btn-ghost btn-icon"
                    style={{ width: 22, height: 22, flexShrink: 0 }}
                >
                    <HugeiconsIcon icon={Cancel01Icon} size={14} />
                </ToastPrimitive.Close>
            </div>
            {t.actionProps && (
                <ToastPrimitive.Action className="btn btn-secondary" style={{ marginTop: 8, fontSize: 12, padding: '3px 10px' }} />
            )}
        </ToastPrimitive.Root>
    ))
}

interface OrganicToasterProps {
    // Un élément direct, pas un useRef : voir le commentaire dans
    // CollectionsPage.tsx sur pourquoi un RefObject ne fonctionne pas ici.
    container?: HTMLElement | null
}

// Toaster stylé Organic (card/btn), portalé dans le conteneur `.organic-theme`
// passé en `container` pour hériter du CSS scopé.
export function OrganicToaster({ container }: OrganicToasterProps) {
    return (
        <ToastPrimitive.Provider toastManager={toastManager}>
            <ToastPrimitive.Portal container={container}>
                <ToastPrimitive.Viewport
                    style={{
                        position: 'fixed',
                        bottom: 'var(--space-4)',
                        right: 'var(--space-4)',
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        width: 280,
                    }}
                >
                    <ToastList />
                </ToastPrimitive.Viewport>
            </ToastPrimitive.Portal>
        </ToastPrimitive.Provider>
    )
}
