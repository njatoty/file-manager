export const getParentPath = (path: string) => {
    let splitedPath = path.split('\\');
    splitedPath.pop();
    return splitedPath.join('\\');
}