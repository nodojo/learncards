learncards
==========

Learn Cards is a simple module which allows you to host a web server
of custom defined flash cards.

Simply install `learncards` and provide a simple json file defining
all of the questions and answers for the flash cards.

Why did I pick a stupid name like `learncards`? Because someone already
took the name `flashcard` in npm and using `flashcards` seems confusing.
So in come my limited creativity when it comes to naming projects.

## Installing
### Via Git
```bash
git clone git://github.com/brettlangdon/learncards.git
cd ./learncards
npm install

./bin/learncards my_flashcards.json
```

### Via NPM
```bash
npm install -g learncards
learncards my_flashcards.json
```

## Flashcards
A Flashcard json file *MUST* contain a `cards` property where each card is
an object which *MUST* contain a `question` and `answer` property.

An optional top level property of `title` can be provided which sets the
title in the html site accordingly.

### Example
```javascript
{
  "title": "My Flashcards",
  "cards": [
    {
      "question": "Who is the greatest?",
      "answer": "Brett Langdon"
    },
    {
      "question": "Who is terrible at naming projects?",
      "answer": "Brett Langdon"
    }
  ]
}
```

## Running
There is a binary file included with the installation `learncards`.
If `learncards` is installed globally then the command should be available.
Otherwise you can run the binary directly from the `learncards` directory.

When running you must provide the location of the flashcards json file.

### Example
```bash
learncards my_flashcards.json
```

Then simple navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
to practice your flashcards.


## License
```
The MIT License (MIT)

Copyright (c) 2013 Brett Langdon <brett@blangdon.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
