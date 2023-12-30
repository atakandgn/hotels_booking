import { Button } from "@material-tailwind/react";
import {Link} from "react-router-dom";

export function CustomButton({variant, text, color, size, className,link,optionalClass}) {
    return (
        <div className={optionalClass}>
            {
                link ?
                    <Link to={link}>
                        <Button variant={variant} color={color}  size={size} className={className}>
                            {text}
                        </Button>
                    </Link>

                    :

                    <Button variant={variant} color={color}  size={size} className={className}>
                        {text}
                    </Button>
            }

        </div>
    );
}