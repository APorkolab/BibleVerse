# 🚀 Deployment Guide - BibleVerse

This guide covers deployment strategies, infrastructure setup, and operational procedures for the BibleVerse application across different environments.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [CI/CD Deployment](#cicd-deployment)
- [Monitoring & Observability](#monitoring--observability)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)

## 🎯 Overview

BibleVerse supports multiple deployment strategies:

- **Local Development**: Docker Compose with hot reload
- **Staging**: Kubernetes with staging configuration
- **Production**: Kubernetes with high availability and monitoring
- **CI/CD**: Automated deployments via GitHub Actions

## 📦 Prerequisites

### System Requirements

- **Container Runtime**: Docker 24+ or containerd
- **Orchestration**: Kubernetes 1.28+
- **Load Balancer**: NGINX Ingress Controller
- **SSL/TLS**: cert-manager with Let's Encrypt
- **Monitoring**: Prometheus, Grafana (optional)

### Access Requirements

- GitHub repository access
- Container registry access (GitHub Container Registry)
- Kubernetes cluster admin access
- Domain name and DNS control

## 🏗️ Environment Setup

### Development Environment

```bash
# Clone repository
git clone https://github.com/APorkolab/BibleVerse.git
cd BibleVerse

# Start development environment
npm run docker:compose:dev

# Access application
open http://localhost:4200
```

### Staging Environment

```bash
# Deploy to staging namespace
kubectl apply -f k8s/staging/

# Verify deployment
kubectl get pods -n bibleverse-staging
kubectl get ingress -n bibleverse-staging

# Access staging
open https://staging-bibleverse.aporkolab.com
```

### Production Environment

```bash
# Deploy to production namespace
kubectl apply -f k8s/production/

# Verify deployment
kubectl get pods -n bibleverse-production
kubectl get ingress -n bibleverse-production

# Access production
open https://bibleverse.aporkolab.com
```

## 🐳 Docker Deployment

### Local Development

```yaml
# docker-compose.yml
version: '3.8'

services:
  bibleverse-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "4200:4200"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

```bash
# Start development
docker-compose --profile development up

# Stop development
docker-compose down
```

### Production Build

```bash
# Build production image
docker build -t bibleverse:latest .

# Run production container
docker run -d \
  --name bibleverse-prod \
  -p 8080:8080 \
  -e NODE_ENV=production \
  bibleverse:latest

# Health check
curl http://localhost:8080/health
```

### Registry Operations

```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

# Tag image
docker tag bibleverse:latest ghcr.io/aporkolab/bibleverse/bibleverse:v1.0.0

# Push image
docker push ghcr.io/aporkolab/bibleverse/bibleverse:v1.0.0
```

## ☸️ Kubernetes Deployment

### Namespace Setup

```bash
# Create namespaces
kubectl create namespace bibleverse-staging
kubectl create namespace bibleverse-production

# Create service accounts
kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: bibleverse-staging
  namespace: bibleverse-staging
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: bibleverse-production
  namespace: bibleverse-production
EOF
```

### Staging Deployment

```bash
# Deploy staging
kubectl apply -f k8s/staging/

# Check deployment status
kubectl rollout status deployment/bibleverse-staging -n bibleverse-staging

# Get service endpoint
kubectl get ingress bibleverse-ingress-staging -n bibleverse-staging
```

### Production Deployment

```bash
# Deploy production
kubectl apply -f k8s/production/

# Check deployment status
kubectl rollout status deployment/bibleverse-production -n bibleverse-production

# Verify HPA
kubectl get hpa -n bibleverse-production

# Check PDB
kubectl get pdb -n bibleverse-production
```

### Configuration Management

```bash
# Create ConfigMap for environment variables
kubectl create configmap bibleverse-config \
  --from-literal=NODE_ENV=production \
  --from-literal=ENVIRONMENT=production \
  -n bibleverse-production

# Create Secret for sensitive data
kubectl create secret generic bibleverse-secrets \
  --from-literal=api-key="your-api-key" \
  -n bibleverse-production
```

### SSL/TLS Setup

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: ap@aporkolab.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

## 🔄 CI/CD Deployment

### GitHub Actions Setup

1. **Configure Secrets**:
   ```bash
   # Required secrets in GitHub repository
   SONAR_TOKEN          # SonarQube authentication
   SLACK_WEBHOOK_URL    # Deployment notifications
   KUBECONFIG          # Kubernetes cluster access (base64 encoded)
   ```

2. **Trigger Deployment**:
   ```bash
   # Manual deployment
   gh workflow run "CI/CD Pipeline - BibleVerse" \
     --ref main \
     -f environment=production
   
   # Automatic deployment (push to main)
   git push origin main
   ```

### Pipeline Stages

```mermaid
graph LR
    A[Code Push] --> B[Quality Checks]
    B --> C[Build & Test]
    C --> D[Security Scan]
    D --> E[Deploy Staging]
    E --> F[Smoke Tests]
    F --> G[Deploy Production]
    G --> H[Health Check]
```

### Deployment Strategies

#### Rolling Update (Default)
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
```

#### Blue-Green Deployment
```bash
# Deploy to blue environment
kubectl apply -f k8s/production/ --dry-run=client -o yaml | \
sed 's/bibleverse-production/bibleverse-blue/g' | kubectl apply -f -

# Switch traffic
kubectl patch service bibleverse-service-production \
  -p '{"spec":{"selector":{"version":"blue"}}}'

# Cleanup old version
kubectl delete deployment bibleverse-green -n bibleverse-production
```

#### Canary Deployment
```yaml
# Canary deployment with 10% traffic
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bibleverse-canary
spec:
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: bibleverse-canary
  - route:
    - destination:
        host: bibleverse-stable
      weight: 90
    - destination:
        host: bibleverse-canary
      weight: 10
```

## 📊 Monitoring & Observability

### Health Checks

```bash
# Application health
curl https://bibleverse.aporkolab.com/health

# Kubernetes health
kubectl get pods -n bibleverse-production
kubectl describe pod <pod-name> -n bibleverse-production
```

### Prometheus Metrics

```yaml
# ServiceMonitor for Prometheus
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: bibleverse-metrics
  namespace: bibleverse-production
spec:
  selector:
    matchLabels:
      app: bibleverse
  endpoints:
  - port: http
    path: /metrics
```

### Grafana Dashboards

```bash
# Access Grafana
kubectl port-forward svc/grafana 3000:3000 -n monitoring
open http://localhost:3000

# Import BibleVerse dashboard
curl -X POST \
  http://admin:admin@localhost:3000/api/dashboards/db \
  -H 'Content-Type: application/json' \
  -d @monitoring/grafana/bibleverse-dashboard.json
```

### Log Aggregation

```bash
# View application logs
kubectl logs -f deployment/bibleverse-production -n bibleverse-production

# Stream logs to external system
kubectl logs --since=1h deployment/bibleverse-production \
  -n bibleverse-production | \
  jq -r '.timestamp + " " + .level + " " + .message'
```

## 🔧 Troubleshooting

### Common Issues

#### Pod Startup Issues
```bash
# Check pod events
kubectl describe pod <pod-name> -n bibleverse-production

# Check resource limits
kubectl top pods -n bibleverse-production

# Check image pull
kubectl get events --field-selector reason=Failed -n bibleverse-production
```

#### Service Connectivity
```bash
# Test service endpoint
kubectl exec -it <pod-name> -n bibleverse-production -- curl http://service-name

# Check service configuration
kubectl get svc -n bibleverse-production -o yaml

# Verify endpoints
kubectl get endpoints -n bibleverse-production
```

#### Ingress Issues
```bash
# Check ingress status
kubectl describe ingress bibleverse-ingress-production -n bibleverse-production

# Verify SSL certificate
kubectl get certificates -n bibleverse-production

# Check ingress controller logs
kubectl logs -f deployment/nginx-ingress-controller -n ingress-nginx
```

### Performance Issues

#### Resource Analysis
```bash
# CPU and memory usage
kubectl top pods -n bibleverse-production --sort-by=cpu
kubectl top pods -n bibleverse-production --sort-by=memory

# Horizontal Pod Autoscaler status
kubectl describe hpa bibleverse-hpa-production -n bibleverse-production
```

#### Network Analysis
```bash
# Network policies
kubectl get networkpolicies -n bibleverse-production

# Service mesh (if using Istio)
istioctl proxy-status
istioctl analyze -n bibleverse-production
```

## 🔄 Rollback Procedures

### Kubernetes Rollback

```bash
# Check rollout history
kubectl rollout history deployment/bibleverse-production -n bibleverse-production

# Rollback to previous version
kubectl rollout undo deployment/bibleverse-production -n bibleverse-production

# Rollback to specific revision
kubectl rollout undo deployment/bibleverse-production \
  --to-revision=2 -n bibleverse-production

# Check rollback status
kubectl rollout status deployment/bibleverse-production -n bibleverse-production
```

### Database Rollback (if applicable)

```bash
# Backup before deployment
kubectl exec -it <postgres-pod> -- pg_dump -U postgres bibleverse > backup.sql

# Restore from backup
kubectl exec -i <postgres-pod> -- psql -U postgres bibleverse < backup.sql
```

### Configuration Rollback

```bash
# Restore previous ConfigMap
kubectl rollout undo configmap/bibleverse-config -n bibleverse-production

# Restart deployment to pick up changes
kubectl rollout restart deployment/bibleverse-production -n bibleverse-production
```

## 🚨 Emergency Procedures

### Service Degradation

1. **Immediate Response**:
   ```bash
   # Scale up replicas
   kubectl scale deployment bibleverse-production --replicas=10 -n bibleverse-production
   
   # Check resource usage
   kubectl top nodes
   kubectl top pods -n bibleverse-production
   ```

2. **Circuit Breaker**:
   ```bash
   # Enable maintenance mode (if implemented)
   kubectl patch configmap bibleverse-config \
     -p '{"data":{"maintenance_mode":"true"}}' \
     -n bibleverse-production
   ```

### Complete Outage

1. **Switch to Backup**:
   ```bash
   # Route traffic to backup region
   kubectl patch ingress bibleverse-ingress-production \
     -p '{"spec":{"rules":[{"host":"bibleverse.aporkolab.com","http":{"paths":[{"path":"/","pathType":"Prefix","backend":{"service":{"name":"bibleverse-backup","port":{"number":80}}}}]}}]}}' \
     -n bibleverse-production
   ```

2. **Disaster Recovery**:
   ```bash
   # Deploy to disaster recovery environment
   kubectl apply -f k8s/dr/ --context=disaster-recovery-cluster
   
   # Update DNS to point to DR environment
   # (This should be automated via external-dns or manual DNS update)
   ```

## 📚 Additional Resources

### Documentation Links
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/)

### Tools and Utilities
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Helm Charts](https://helm.sh/docs/chart_template_guide/)
- [Kustomize](https://kustomize.io/)
- [Skaffold](https://skaffold.dev/) (for development)

### Support Contacts
- **Infrastructure**: [ap@aporkolab.com](mailto:ap@aporkolab.com)
- **Security**: [ap@aporkolab.com](mailto:ap@aporkolab.com)
- **Emergency**: [ap@aporkolab.com](mailto:ap@aporkolab.com)

---

This deployment guide is continuously updated as new features and improvements are added to the BibleVerse application.
