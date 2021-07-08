const configdata = {
  id: 1,
  children: [
    { id: 2, children: [{ id: 3 }, { id: 6 }] },
    { id: 4 },
    { id: 5, children: [{ id: 7, children: [{ id: 8 }, { id: 9 }] }] },
  ]
}

// 스택에 복제 할 원본 포함
const copynode1 = (config: any) => {
  let target;
  const copy: {[key: string]: any} = {}
  const stack = [{node: config, parent: null, copy}];

  while(target = stack.shift()){
    const {node, parent, copy} = target;
    copy.id = node.id;
    parent && (copy.parent = parent)
    if(node.children){
      copy.children = node.children.map(() => ({}));
      stack.unshift(...node.children.map((child: any, i: number) => {
        return ({node: child, parent: copy, copy: copy.children[i]})
      }))
    }
  }
  console.log(copy)
}
copynode1(configdata);

// 스택 2개 
const copynode2 = (config: any) => {
  let target: any;
  let copyTarget: any;
  const copy = {}
  const stack = [config];
  const copyStack = [{node: copy, parent: null}];

  while(target = stack.shift()){
    copyTarget = copyStack.shift();
    copyTarget.node.id = target.id;
    copyTarget.parent && (copyTarget.node.parent = copyTarget.parent);

    if(target.children){
      copyTarget.node.children = target.children.map(() => ({}));
      stack.unshift(...target.children);
      copyStack.unshift(...copyTarget.node.children.map((child: any, i: number) => ({node: child, parent: copyTarget.node})))
    }
  }
  console.log(copy);
}
copynode2(configdata)
