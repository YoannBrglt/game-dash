# Plan Frontend — Magic Garden Tracker

Stack : React + TypeScript, TanStack Router, TanStack Query, shadcn/ui, Tailwind CSS

Progression suivie via les cases à cocher `[x]`.

---

## Étape 1 — Configuration du projet

### Setup de base
- [x] Initialiser le projet (Vite + React + TypeScript) dans le monorepo (`frontend/` ou `apps/web/`)
- [x] Configurer Tailwind CSS
- [x] Installer et initialiser shadcn/ui (`components.json`, thème de base)
- [x] Installer TanStack Router
- [x] Installer TanStack Query
- [x] Configurer Oxlint (+ Prettier pour le formatting, Oxlint ne formate pas)
- [ ] `.vscode/settings.json` et `extensions.json` pour le frontend (cohérent avec le reste du monorepo)

### Structure du projet
- [x] Arborescence de dossiers :
  - `src/routes/` (TanStack Router — file-based ou config-based, à trancher)
  - `src/components/ui/` (composants shadcn générés)
  - `src/components/` (composants métier partagés)
  - `src/features/auth/`
  - `src/features/collections/`
  - `src/lib/` (client API, utils)
  - `src/hooks/`
  - `src/types/` (types partagés : Crop, Mutation, Possession, User…)

### Configuration API
- [x] Variable d'env pour l'URL de l'API (`VITE_API_URL`), avec `.env.example`
- [x] Client API centralisé (`fetch` ou `ky`/`axios`) :
  - `credentials: "include"` obligatoire pour que les cookies de session circulent
  - Gestion des erreurs HTTP centralisée (401 → redirection login, etc.)
- [x] Config CORS côté backend à vérifier (origin autorisée + `Access-Control-Allow-Credentials: true`)
- [x] Provider TanStack Query (QueryClient + QueryClientProvider) au niveau racine
- [x] Router TanStack configuré avec `RouterProvider`
- [x] File-based routing activé (plugin Vite `@tanstack/router-plugin`, dossier `src/routes/`)

### Routing de base
- [x] Layout racine avec `Outlet`
- [x] Route `/login`
- [x] Route `/signup`
- [x] Route `/dashboard` (protégée)
- [x] Redirection par défaut selon état de connexion (`/` redirige vers `/dashboard` si connecté, `/login` sinon)

---

## Étape 2 — Connexion (Auth)

> Auth par session : cookie posé par `auth/signup` et `auth/login`. Pas de token à stocker côté client.

### État d'authentification
- [x] Hook / contexte `useAuth` ou `useSession`
- [x] Vérifier que `GET account/profile` renvoie bien 401 (pas 500 ni objet vide) quand le cookie de session est absent/invalide — condition nécessaire pour l'utiliser comme session check
- [x] Utiliser `GET account/profile` au chargement de l'app pour vérifier la session courante
- [x] Query TanStack Query pour l'utilisateur courant (`queryKey: ["profile"]`, centralisée dans `useSession.ts` et réutilisée par les autres hooks), utilisée comme source de vérité pour l'état "logué / logout"

### Page Signup
- [x] Formulaire (`@tanstack/react-form` + `Field` shadcn + validation zod)
- [x] Mutation TanStack Query → `POST auth/signup`
- [x] Gestion des erreurs (email déjà pris → 409, mot de passe invalide, etc.)
- [x] Redirection vers le dashboard après succès (`setQueryData` sur `profile`)

### Page Login
- [x] Formulaire (email/username + mot de passe)
- [x] Mutation → `POST auth/login`
- [x] Gestion des erreurs (identifiants invalides → 401)
- [x] Redirection vers le dashboard après succès

### Logout
- [ ] Bouton logout dans le dashboard (hook `useLogout` prêt, pas encore branché dans une UI)
- [x] Créer l'endpoint `auth/logout` côté backend (invalide la session serveur + supprime le cookie)
- [x] Invalidation de la query `profile` côté client + redirection vers `/login`

### Protection des routes
- [x] Guard sur `/dashboard` (et sous-routes) : redirection vers `/login` si non connecté
- [x] Guard inverse sur `/login` et `/signup` : redirection vers `/dashboard` si déjà connecté
- [ ] État de chargement pendant la vérification de session (éviter le flash de contenu)

---

## Étape 3 — Dashboard

### Layout général
- [ ] Layout dashboard avec navigation par onglets (shadcn `Tabs`) — différé : un seul onglet pour l'instant, pas encore nécessaire (design "simple pour le moment")
- [x] Onglet "Collections" (premier et seul onglet pour l'instant, structure prête pour en accueillir d'autres plus tard — ex. Phase 3 follow system)
- [x] Header avec infos utilisateur + logout

### Onglet Collections — Lecture
- [x] Query TanStack Query → `GET api/v1/collections`
- [x] Types TypeScript pour la réponse (Crop, Mutation, Collection)
- [x] Affichage des crops en grille (shadcn `Card`), groupée par section de rareté
- [x] Affichage de l'image de chaque crop (URL fournie dans l'objet crop)
- [x] Affichage des 13 mutations par crop (pastille par mutation, obtenue ou non)
- [x] Regroupement/filtrage par rareté (Common → Celestial) — sections + filtre dropdown
- [x] État de chargement (skeletons shadcn)
- [x] État d'erreur (message + retry)
- [x] État vide (si aucune donnée / filtres sans résultat)

### Onglet Collections — Mise à jour
- [x] Interaction UI pour cocher/décocher une mutation obtenue sur un crop (pastille cliquable par mutation)
- [x] Mutation TanStack Query → `PUT api/v1/collections/:id`
- [x] Update optimiste : `onMutate` (annuler les queries en cours, snapshot du cache, appliquer le changement immédiatement), `onError` (rollback via le snapshot), `onSettled` (invalidation pour resynchroniser avec le serveur)
- [x] Gestion des erreurs de mise à jour (rollback automatique via le snapshot)
- [x] Feedback visuel de sauvegarde (toast Organic avec bouton "Annuler", `@base-ui/react/toast` — pas le toast shadcn de `components/ui/toast.tsx`, thèmes différents)
- [x] Confirmation avant de décocher une mutation déjà obtenue (`@base-ui/react/alert-dialog`, stylé `.dialog`/`.dialog-backdrop`) — cocher reste immédiat (annulable via le toast), décocher est jugé destructif

### Divers / polish
- [x] Recherche/filtre texte sur les crops (nom)
- [x] Filtre par type de mutation (`base`, `weather`, `specific`, `rarity`)
- [x] Responsive (grille fluide `auto-fill`, pas de media query nécessaire ; pas testé sur device réel)
- [x] Emplacement prévu pour couleurs/icônes de mutation à venir (`MutationBadge` isolé, `rarityColors.ts` en fallback tant que `colorHex` n'est pas seedé)

---

## Notes / points à trancher avec l'équipe

- ~~Vérifier que `GET account/profile` renvoie bien 401 sans cookie de session valide~~ → confirmé, utilisé comme session check.
- ~~Endpoint `auth/logout` à créer côté backend~~ → déjà en place (`session_controller.ts`).
- ~~Décider file-based routing vs config-based routing~~ → **file-based routing retenu**.
- ~~Décider optimistic update vs invalidation simple~~ → **optimistic update retenu** pour le `PUT` des collections.
- ~~Décider workspaces npm vs projets indépendants~~ → **pas de workspaces** : `apps/backend` et `apps/frontend` restent indépendants (bugs npm connus sur les workspaces, pas de code partagé pour l'instant).
- ~~Décider react-hook-form vs @tanstack/react-form pour les formulaires~~ → **`@tanstack/react-form` + `Field` (shadcn) retenu** pour login et signup, cohérent avec le reste de la stack TanStack. `react-hook-form`/`@hookform/resolvers` retirés (`signup.tsx` importait un composant `@/components/ui/form` jamais généré, cassant le typecheck).
- Bug corrigé : dans les guards de route (`beforeLoad` de `/login` et `/signup`), le `throw redirect(...)` était placé à l'intérieur du même `try` que la vérification de session, donc avalé par le `catch` — la redirection vers `/dashboard` pour un utilisateur déjà connecté ne se déclenchait jamais. Le `redirect` doit être levé en dehors du `try/catch`.
- Bug corrigé : `login`/`signup`/`getProfile` traitaient la réponse HTTP comme l'objet `User` brut, alors que le backend wrappe tout dans `{ data: ... }` (`{ data: { user: ... } }` pour login/signup) via `ctx.serialize()`. Vérifié en live contre le backend (signup/profile/collections) avant d'écrire le code du dashboard.
- `apiFetch` normalise maintenant les slashs (`VITE_API_URL` avec ou sans `/` final, chemin avec ou sans `/` initial) — un `VITE_API_URL` avec slash final produisait une URL à double slash que le routeur Adonis renvoie en 404.
- `rarity.colorHex` n'est jamais renseigné par le seeder (`01_rarity_seeder.ts`) — toujours `null` en base actuellement. Le front utilise une palette de fallback (`features/collections/lib/rarityColors.ts`) tant que ce n'est pas seedé ; si vous voulez de vraies couleurs par rareté, il faudra compléter le seeder.
- Dashboard (Étape 3) : pas de recherche serveur — `GET /collections` est chargé sans filtres (dataset petit, ~70 crops × 13 mutations) et tout le filtrage (recherche, rareté, type de mutation, obtenues seulement) se fait côté client en mémoire.
