# Learning step: application code to GitOps deployment

## Flow

Push application code to main -> GitHub Actions builds both images -> checks
startup, prediction paths and the frontend proxy -> publishes to GHCR -> opens
or updates a deployment PR -> you merge -> Argo CD syncs -> Kubernetes pulls
the images and rolls out the Pods.

The workflow tags images with the source commit SHA. The deployment PR pins
the exact published digests and replaces imagePullPolicy: Never with
IfNotPresent. Existing local manifests stay unchanged until you merge that PR.

## One-time setup

1. In the GitHub repository, open Settings -> Actions -> General -> Workflow
   permissions. Enable **Allow GitHub Actions to create and approve pull
   requests**. The workflow requests contents, packages and pull-request write
   permissions; organization policies may need to permit these too.
2. Commit/push the workflow, helper script and this guide to main. The workflow
   runs automatically. You can also use Actions -> Build images and propose
   deployment -> Run workflow on main.
3. After the first successful publish, open your GitHub profile's Packages.
   Packages are named `farmvision-ai-api` and `farmvision-ai-web` under Anurag915.
   New GHCR packages default to private. For this local learning setup, set
   BOTH package visibilities to public if you intend to publish their contents.
   Images include application code and, for the API, model files and CSV data.
   If these must remain private, keep the packages private and configure a
   Kubernetes imagePullSecret with GHCR read access on both Deployments instead.
   Do not put credentials into Git.
4. Review and merge the generated `codex/deploy-images` PR after image pull
   access is ready. Do not merge it before completing step 3.
5. Watch Argo CD and run:

   ```powershell
   kubectl rollout status deployment/backend --timeout=180s
   kubectl rollout status deployment/frontend --timeout=180s
   kubectl get pods
   kubectl get deployment backend frontend -o wide
   ```

   A rollout can replace the Pod used by an existing port-forward. If the tunnel
   closes, run `kubectl port-forward service/frontend 8081:80` again.

No personal token is needed to publish images or open the PR: the workflow uses
GitHub's built-in GITHUB_TOKEN. A private package needs separate cluster pull
credentials; Argo CD repository credentials do not provide that access.

## Routine changes

Change React or Python code, commit and push to main. Review the Actions run
and merge its deployment PR. No local docker build or kubectl apply is needed.
Both images are built each time for a simple release flow. The smoke checks
exercise inference but do not establish model accuracy or replace browser tests.

Only app/build inputs trigger automatic builds. A k8s-only merge, replica-count
change or documentation update does not trigger another image build. Manual
dispatch can rebuild on main. If main changes during a run, that run publishes
images but skips its deployment PR to avoid proposing a stale source revision;
rerun on the latest main if no newer application build is already running.

The bot branch is reserved for generated deployment changes. Subsequent runs
replace that branch and update the same open PR. Make application edits on main
or your own feature branches, not on the bot branch.

Revert a merged deployment PR to restore its previous image references, provided
those images remain available. The first deployment's previous references are
local-only images, so that first rollback only works on this learning cluster.
