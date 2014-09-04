### nocs

A cli utility for viewing node docs

### Installation

```
npm install nocs -g
```

### Usage

**Note** : the first time you use `nocs` you'll need to configure your browser to view files

```
$ nocs config set browser chrome
$ nocs os
```

Output

opens file:///node_modules/nocs/node_docs/os.html using google chrome

(screenshot)

### API

```
nocs <option>
```

### Options

| Name          | Description                  |
| ------------- | ---------------------------- |
| `config`      | get, set config paramaters   |
| `module`      | core module name             |
| `help`, `-h`  | print nocs man page          |
| `ls`          | list core module names       |

### Examples

```
$ nocs config set browser chrome
```

```
$ nocs cluster
```

```
$ nocs help
```

```
$ nocs ls
```
