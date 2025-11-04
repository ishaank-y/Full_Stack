# ByteXL: Hard — Deploy Full-Stack App on AWS with Load Balancing

A minimal, student-friendly full-stack app with **AWS Application Load Balancer** + **Auto Scaling Group** provisioning via Terraform.

## What you get
- **Backend:** Node + Express (Dockerized)
- **Frontend:** Static HTML/CSS/JS served by Nginx (Dockerized)
- **Reverse proxy:** Nginx proxies `/api` to the backend
- **Infra (Terraform):** VPC, 2 public subnets, Internet Gateway, ALB (port 80), Target Group, Listener, Launch Template, Auto Scaling Group (desired=2), Security Groups
- **User data:** EC2 instances auto-install Docker, clone your GitHub repo, and `docker-compose up -d --build`

---

## Local run (optional)
```bash
docker compose up -d --build
# Frontend on http://localhost:8080
```

## Files
- `backend/` — Express API
- `frontend/` — Nginx + static site (calls `/api`)
- `nginx/default.conf` — reverse proxy rules
- `docker-compose.yml` — runs both services
- `infra/terraform/` — AWS IaC

---

## One-time AWS setup
1. **Have these ready:**
   - An AWS account with permissions for EC2, ALB, VPC, IAM.
   - AWS CLI configured: `aws configure` (access key, secret, region).
   - Terraform installed (>= 1.5).
2. Create an S3 bucket and DynamoDB table if you want remote state (optional). This template uses **local state** for simplicity.

---

## How the instances get your code
The Launch Template user-data script clones the repo you specify into `/opt/app` and runs:
```bash
docker-compose up -d --build
```
That means you can **just push this project to a public GitHub repo** and set `repo_url` in Terraform.

---

## Deploy with Terraform
1. Push this folder to a **public GitHub repo**.
2. In `infra/terraform/terraform.tfvars`, set:
   ```hcl
   repo_url = "https://github.com/<your-username>/<your-repo>.git"
   aws_region = "ap-south-1"  # Mumbai (recommended for India)
   key_name  = "<existing-ec2-keypair-name>"  # optional, enables SSH
   ```
3. From `infra/terraform/`:
   ```bash
   terraform init
   terraform apply -auto-approve
   ```
4. When done, Terraform prints the ALB DNS in the output: open it in a browser.

### Destroy
```bash
terraform destroy -auto-approve
```

---

## What gets deployed
- **2 EC2 instances** across 2 AZs (public subnets)
- **ALB** on port 80 with health check `GET /api/health`
- **Security Groups** so ALB can reach instances, and the world can reach ALB
- **Auto scaling** (min=2, max=4) — replace unhealthy instances automatically

---

## Quick code overview

**API**
- `GET /api/health` → `{status:"ok"}`
- `GET /api/messages` → list messages (in-memory)
- `POST /api/messages` with JSON `{text:"..."}` → add message

**Frontend**
- One page with a form to add messages and live list via fetch to `/api/messages`.

---

## Notes
- Keep the repo **public** (or attach a deploy key and modify user-data to use it).
- This template uses **Amazon Linux 2023** and installs Docker + docker-compose from GitHub release.
- For production, consider private subnets + NAT, HTTPS (ACM + ALB on 443), ECR for images, and CI/CD.
