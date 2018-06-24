export function quickPrint(node: Element) {
    const body = document.body;
    const container = document.getElementById("container");
    body.replaceChild(node, container as HTMLElement);
}
