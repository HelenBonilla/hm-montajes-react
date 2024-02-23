import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const dateFormatSet = value => 
{
    if(value==""){
        return ""
    }else{
        return format(new Date(value), 'dd/MMM/yyyy', {locale: es})   
    }
}

export {dateFormatSet}