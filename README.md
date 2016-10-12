About
-----


Thanks for your patience on my test first : )

## Run

```
cd from-sketch
npm install
bower install
```

Then:

```
gulp develop
```

You can view the page at your browser.

Use "mobile mode" to view small-device mode of the page.

## AboutTime
+ Made the page costs me 2 hours
+ config the environment and struggle with the bad npm package cost me
more than 5 hours, HaHa. 

## What I haven't handle well
+ Font(My HoneyView can not detect the font).
+ Pixel-perfect size, because I found that the picture is so big.
+ Some gulp workflow such as 'production build'. Now it only works on
develop mode(production mode is not hard to do, but make no sense now,
we can just add some plugin to compress the javascript or css, etc).

## Thinking

This frontend-test really makes me feel that Javascript community is really
a mass now.

It runs fast, and many people dies on the road to solve the problem of the newest
tools and technology.

For example:
This issue really makes me puzzled(I lacks knowledge of it Maybe).
https://github.com/sass/node-sass/issues/215

The underscore makes what a big difference so that we can not compile
file-targets whose name start with underscore in gulp file stream.
At last I give up compiling `bootstrap scss` file into my css file and 
simply output the file into my develop directory.

Maybe we can use a simpler way to develop our project, just makefile or
write javascript directly, we are not writing `SPA` but user-oriented
product.

No mass logic, design and express is enough : )