import { useState } from 'react'
import { useUpdateCollection } from './useUpdateCollection'
import { toastManager } from '../lib/toast'
import type { Collection } from '@/types/collections'

// Cocher une mutation non obtenue est sans risque : s'applique tout de
// suite, avec un toast "Annuler" pour rattraper une erreur de clic.
// Décocher une mutation déjà obtenue fait perdre une progression
// enregistrée : on ne doit jamais perdre un élément de la collection par
// accident, donc ça passe d'abord par une confirmation (voir pendingUncheck).
export function useToggleCollection() {
    const updateCollection = useUpdateCollection()
    const [pendingUncheck, setPendingUncheck] = useState<Collection | null>(null)

    function applyToggle(collection: Collection, nextObtained: boolean) {
        updateCollection.mutate({ id: collection.id, payload: { obtained: nextObtained } })
        toastManager.add({
            title: `${collection.mutation.name} ${nextObtained ? 'obtenue' : 'retirée'}`,
            description: collection.crop.name,
            actionProps: {
                children: 'Annuler',
                onClick: () => {
                    updateCollection.mutate({ id: collection.id, payload: { obtained: !nextObtained } })
                },
            },
        })
    }

    function requestToggle(collection: Collection) {
        if (collection.obtained) {
            setPendingUncheck(collection)
        } else {
            applyToggle(collection, true)
        }
    }

    function confirmUncheck() {
        if (pendingUncheck) applyToggle(pendingUncheck, false)
        setPendingUncheck(null)
    }

    function cancelUncheck() {
        setPendingUncheck(null)
    }

    const pendingIds = new Set(
        updateCollection.isPending && updateCollection.variables ? [updateCollection.variables.id] : []
    )

    return { requestToggle, pendingUncheck, confirmUncheck, cancelUncheck, pendingIds }
}
