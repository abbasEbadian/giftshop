import PaypalImage from '../img/card/002/card-04.png'
export const get_image_name = (type)=>{
    switch (type) {
        case "paypal":
            return PaypalImage
            break;
    
        default:
            break;
    }
}

