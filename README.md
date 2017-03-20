[![Build Status](https://travis-ci.org/UziTech/jasmine-local-storage.png)](https://travis-ci.org/UziTech/jasmine-local-storage) [![Windows Build Status](https://ci.appveyor.com/api/projects/status/9vlhm6tark45cyov?svg=true)](https://ci.appveyor.com/project/UziTech/jasmine-local-storage)

# Jasmine 2.x Mock Local Storage

This will add two functions `mockLocalStorage()` and `unmockLocalStorage()`

# Install

```sh
npm install --save-dev jasmine-local-storage
```

```javascript
// in your jasmine helpers file
require("jasmine-local-storage");
```

# Usage

```javascript
beforeEach(function () {
  mockLocalStorage();
});
```

```javascript
it("will not write to actual localStorage", function () {
  unmockLocalStorage();

  localStorage.setItem("test", 1);
  expect(localStorage.getItem("test")).toBe("1");

  mockLocalStorage();

  localStorage.setItem("test", 2);
  expect(localStorage.getItem("test")).toBe("2");
  expect(localStorage.key(0)).toBe("test");
  localStorage.removeItem("test");
  expect(localStorage.getItem("test")).toBe(null);

  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  expect(localStorage.key).toHaveBeenCalledTimes(1);
  expect(localStorage.clear).toHaveBeenCalledTimes(0);

  unmockLocalStorage();

  expect(localStorage.getItem("test")).toBe("1");
  localStorage.removeItem("test");
});
```
