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
- [ ] Layout dashboard avec navigation par onglets (shadcn `Tabs`)
- [ ] Onglet "Collections" (premier et seul onglet pour l'instant, structure prête pour en accueillir d'autres plus tard — ex. Phase 3 follow system)
- [ ] Header avec infos utilisateur + logout

### Onglet Collections — Lecture
- [ ] Query TanStack Query → `GET api/v1/collections`
- [ ] Types TypeScript pour la réponse (Crop, Mutation, Possession)
- [ ] Affichage des crops en grille (shadcn `Card`)
- [ ] Affichage de l'image de chaque crop (URL fournie dans l'objet crop)
- [ ] Affichage des 13 mutations par crop (checkbox/badge par mutation, obtenue ou non)
- [ ] Regroupement/filtrage par rareté (Common → Celestial)
- [ ] État de chargement (skeletons shadcn)
- [ ] État d'erreur (message + retry)
- [ ] État vide (si aucune donnée)

### Onglet Collections — Mise à jour
- [ ] Interaction UI pour cocher/décocher une mutation obtenue sur un crop (checkbox ou toggle par mutation)
- [ ] Mutation TanStack Query → `PUT api/v1/collections/:id`
- [ ] Update optimiste : `onMutate` (annuler les queries en cours, snapshot du cache, appliquer le changement immédiatement), `onError` (rollback via le snapshot), `onSettled` (invalidation pour resynchroniser avec le serveur)
- [ ] Gestion des erreurs de mise à jour (rollback automatique + toast d'erreur)
- [ ] Feedback visuel de sauvegarde (toast shadcn ou indicateur discret)

### Divers / polish
- [ ] Recherche/filtre texte sur les crops (nom)
- [ ] Filtre par type de mutation (`base`, `weather`, `specific`, `rarity`)
- [ ] Responsive (mobile/desktop)
- [ ] Emplacement prévu pour couleurs/icônes de mutation à venir (structure de composant extensible plutôt que valeurs codées en dur)

---

## Notes / points à trancher avec l'équipe

- ~~Vérifier que `GET account/profile` renvoie bien 401 sans cookie de session valide~~ → confirmé, utilisé comme session check.
- ~~Endpoint `auth/logout` à créer côté backend~~ → déjà en place (`session_controller.ts`).
- ~~Décider file-based routing vs config-based routing~~ → **file-based routing retenu**.
- ~~Décider optimistic update vs invalidation simple~~ → **optimistic update retenu** pour le `PUT` des collections.
- ~~Décider workspaces npm vs projets indépendants~~ → **pas de workspaces** : `apps/backend` et `apps/frontend` restent indépendants (bugs npm connus sur les workspaces, pas de code partagé pour l'instant).
- ~~Décider react-hook-form vs @tanstack/react-form pour les formulaires~~ → **`@tanstack/react-form` + `Field` (shadcn) retenu** pour login et signup, cohérent avec le reste de la stack TanStack. `react-hook-form`/`@hookform/resolvers` retirés (`signup.tsx` importait un composant `@/components/ui/form` jamais généré, cassant le typecheck).
- Bug corrigé : dans les guards de route (`beforeLoad` de `/login` et `/signup`), le `throw redirect(...)` était placé à l'intérieur du même `try` que la vérification de session, donc avalé par le `catch` — la redirection vers `/dashboard` pour un utilisateur déjà connecté ne se déclenchait jamais. Le `redirect` doit être levé en dehors du `try/catch`.
