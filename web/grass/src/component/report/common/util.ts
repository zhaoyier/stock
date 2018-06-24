import {
    isUAT
} from "../../../util/url";

export function getProductLink(productId: number): string {
    if ( isUAT() ) {
        return `http://sg.65emall.net/product/${productId}.html`;
    }
    return `https://ezbuy.sg/product/${productId}.html`;
}
