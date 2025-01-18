note: the composition of the files in this repo is a little wonk... i was trying to go for like, separate widget spaces but realized it'd be cleaner to just have an index.tsx file (that gets bundled and referenced via the script) to dynamically choose which widgets we actually want to use, assuming they're available on cloudfront.

---

if you haven't already got it, install pnpm globally
`npm install -g pnpm`

why pnpm? it is a fast, disk-efficient package manager for js and ts projects. it is an alternative to npm and yarn, designed to be _faster, use less disk space, and work better with monorepos_.

in root, run `pnpm i`, this should install all the deps at root and for each workspace according to the path in the `pnpm-workspace.yaml` file.

i've set up a test aws account + s3 bucket + cloudfront distribution, set up the right security settings so the widget scripts will be accessible, and i've used webpack to bundle these widgets and such.

to do this, you can run `pnpm run build` and it'll bundle everything and plop it into the `dist` directory. these .js files will be the ones you want to upload to the s3 bucket! seems as though we can safely ignore the other files tho.

when you make a new widget, you'll want to register it inside of the `webpack.config.js` file near the top, there's a comment indicating the structure. this is when you'd run `pnpm run build` again to get the file you want to upload to the s3 bucket.

here is an example `index.html` you can use to test things out:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Widget Test</title>
  </head>
  <body>
    <div id="tree-widget-container"></div>
    <div id="star-widget-container"></div>

    <script src="https://d1wakbm2x7tbyr.cloudfront.net/widgets/index.js"></script>

    <script>
      console.log(window.Widget);
      // this will load the 'plant-tree-widget' from CloudFront and render it to #tree-widget-container
      window.Widget.mount("#tree-widget-container", "plant-tree-widget", {
        sku: "12345",
        title: "Plant a Tree",
        buttonText: "Support Now",
        description: "Support their family and plant a tree.",
      });

      window.Widget.mount("#star-widget-container", "buy-star-widget", {
        sku: "12345",
      });
    </script>
  </body>
</html>
```
