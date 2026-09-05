import { AlertDialog } from '@base-ui/react/alert-dialog'

interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void
    // Un élément direct, pas un useRef : voir le commentaire dans
    // CollectionsPage.tsx sur pourquoi un RefObject ne fonctionne pas ici.
    container?: HTMLElement | null
}

// Dialog de confirmation générique, stylé avec les classes .dialog-backdrop/
// .dialog du design Organic. Utilisé pour les actions destructives (ex:
// décocher une mutation déjà obtenue).
export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    onConfirm,
    container,
}: ConfirmDialogProps) {
    return (
        <AlertDialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
            <AlertDialog.Portal container={container}>
                <AlertDialog.Backdrop className="dialog-backdrop" />
                <AlertDialog.Popup
                    className="dialog"
                    style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                    <AlertDialog.Title className="dialog-title">{title}</AlertDialog.Title>
                    <AlertDialog.Description className="dialog-body">{description}</AlertDialog.Description>
                    <div className="dialog-actions">
                        <AlertDialog.Close className="btn btn-secondary">{cancelLabel}</AlertDialog.Close>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                onConfirm()
                                onOpenChange(false)
                            }}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </AlertDialog.Popup>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}
