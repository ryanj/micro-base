# micro-base
*An example project built using the zeit/micro framework*

[![npm dependency statuses](http://img.shields.io/david/ryanj/micro-base.svg "npm dependencies, via david-dm")](https://david-dm.org/ryanj/micro-base)

## Local Dev
Clone the repo for a local development environment, then install dependencies and launch with:

```bash
npm install
npm run dev
```

## Developing with OpenShift

Use NodeJS v8.5.0 or higher when running this code:

```bash
oc new-app -e NPM_RUN=dev ryanj/nodejs-demo:8~https://github.com/ryanj/micro-base
```

Expose a route to your app to review changes while you work:

```bash
oc expose svc/micro-base && xdg-open http://$(oc get route micro-base | grep -v NAME | awk '{print $2}')
```

Connect to a pod using a live terminal in the OpenShift dashboard, or continuously sync code from a local clone of this repo into your remotely-running container:

```bash
oc rsync -w --exclude='.git*,node_modules*' $(pwd)/ $(oc get pods | grep -v NAME | grep -v build | cut -f1 -d' '):/opt/app-root/src/
```

## License: MIT
