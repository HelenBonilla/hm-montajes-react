import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const dateFormat = value => 
{
    if(value==""){
        return ""
    }else{
        return format(new Date(value), 'dd/MMM/yyyy h:mm a', {locale: es})
    }
}

export {dateFormat}