export default function flattenArray(list, key = 'children') {
  let children = [];

  const flatten = list?.map((item) => {
    if (item && item[key] && Array.isArray(item[key])) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(children.length ? flattenArray(children, key) : children);
}
