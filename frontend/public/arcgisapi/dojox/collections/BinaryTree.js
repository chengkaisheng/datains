//>>built
define(["dojo/_base/kernel","dojo/_base/array","./_base"],function(q,r,f){f.BinaryTree=function(n){function p(a,b,c){this.value=a||null;this.right=b||null;this.left=c||null;this.clone=function(){var d=new p;d.value=this.value.value?this.value.clone():this.value;null!=this.left&&(d.left=this.left.clone());null!=this.right&&(d.right=this.right.clone());return d};this.compare=function(d){return this.value>d.value?1:this.value<d.value?-1:0};this.compareData=function(d){return this.value>d?1:this.value<
d?-1:0}}function g(a,b){a&&(g(a.left,b),b.push(a.value),g(a.right,b))}function h(a,b){var c="";a&&(c=a.value.toString()+b,c+=h(a.left,b),c+=h(a.right,b));return c}function k(a,b){var c="";a&&(c=k(a.left,b),c+=a.value.toString()+b,c+=k(a.right,b));return c}function l(a,b){var c="";a&&(c=l(a.left,b),c+=l(a.right,b),c+=a.value.toString()+b);return c}function m(a,b){if(!a)return null;var c=a.compareData(b);return 0==c?a:0<c?m(a.left,b):m(a.right,b)}this.add=function(a){a=new p(a);for(var b,c=e,d=null;c;){b=
c.compare(a);if(0==b)return;d=c;c=0<b?c.left:c.right}this.count++;d?(b=d.compare(a),0<b?d.left=a:d.right=a):e=a};this.clear=function(){e=null;this.count=0};this.clone=function(){for(var a=new f.BinaryTree,b=this.getIterator();!b.atEnd();)a.add(b.get());return a};this.contains=function(a){return null!=this.search(a)};this.deleteData=function(a){for(var b=e,c=null,d=b.compareData(a);0!=d&&null!=b;)0<d?(c=b,b=b.left):0>d&&(c=b,b=b.right),d=b.compareData(a);if(b)if(this.count--,b.right)if(b.right.left){a=
b.right.left;for(d=b.right;null!=a.left;)d=a,a=a.left;d.left=a.right;a.left=b.left;a.right=b.right;c?(d=c.compare(b),0<d?c.left=a:0>d&&(c.right=a)):e=a}else c?(d=c.compare(b),0<d?c.left=b.right:0>d&&(c.right=b.right)):e=b.right;else c?(d=c.compare(b),0<d?c.left=b.left:0>d&&(c.right=b.left)):e=b.left};this.getIterator=function(){var a=[];g(e,a);return new f.Iterator(a)};this.search=function(a){return m(e,a)};this.toString=function(a,b){a||(a=f.BinaryTree.TraversalMethods.Inorder);b||(b=",");var c=
"";switch(a){case f.BinaryTree.TraversalMethods.Preorder:c=h(e,b);break;case f.BinaryTree.TraversalMethods.Inorder:c=k(e,b);break;case f.BinaryTree.TraversalMethods.Postorder:c=l(e,b)}return 0==c.length?"":c.substring(0,c.length-b.length)};this.count=0;var e=this.root=null;n&&this.add(n)};f.BinaryTree.TraversalMethods={Preorder:1,Inorder:2,Postorder:3};return f.BinaryTree});