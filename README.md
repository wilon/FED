
# wilon.github.io
[![Build Status](https://travis-ci.org/wilon/wilon.github.io.svg?branch=master)](https://travis-ci.org/wilon/wilon.github.io)

A simple notes show page. Fast search and copy.

![show-gif](https://user-images.githubusercontent.com/7512755/27375951-40603768-56a3-11e7-9b1e-a7b66927dc98.gif)


## Require

Require Latest `nodejs` + `npm` + `gulp`, And Ubuntu require:

```shell
sudo add-apt-repository ppa:dhor/myway
sudo apt-get update
sudo apt-get install graphicsmagick
sudo apt-get install imagemagick
```

## Development

```shell
git clone https://github.com/wilon/wilon.github.io.git
cd wilon.github.io
npm install
gulp server
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Build your own github.io webpage notes

* Fork this repo.
* Modify `.travis.yml :27 & :54` to your settings. And add your travis Environment Variables `GH_TOKEN`.
* Next add your own notes.↓↓↓

## Add Notes

1. Write notes

    `data/{SOME_NOTE}.md`

2. Add icon

    `src/images/{SOME_NOTE}.png`

3. Browser Sync

## Tips

You must write notes file `data/{SOME_NOTE}.md` like this:

    ### ${note title}
    ```${note code language}
        ${note content}
        ...
    ```
