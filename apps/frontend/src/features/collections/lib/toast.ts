import { Toast as ToastPrimitive } from '@base-ui/react/toast'

// Instance dédiée à ce dashboard, distincte du gestionnaire par défaut de
// components/ui/toast.tsx (thème shadcn) — celui-ci est stylé en Organic
// et monté par OrganicToaster.
export const toastManager = ToastPrimitive.createToastManager()
