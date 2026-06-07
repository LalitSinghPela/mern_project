const url=new URL("https://example.org:8000");
url.pathname='/a/b/c';
url.search='?d=e';
url.hash='#fgh'

console.log(url)
console.log(url.href)