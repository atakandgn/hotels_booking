import {
    Card,
    CardHeader,
    CardBody,
    Typography, Tooltip, Chip,
} from "@material-tailwind/react";
import {CustomButton} from "./CustomButton";

export function ProductCardHorizontal() {
    return (
        <Card className="w-full h-60 flex-row">
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody className="w-full flex justify-between items gap-3 py-4 px-2">
                <div className="flex flex-col w-2/3">
                    <div className="flex flex-col">
                        <Typography variant="h6" color="gray" className="uppercase">
                            Holida Inn Resort Baruna Bali
                        </Typography>
                        <Typography variant="h5" color="blue-gray">
                            Bodrum Merkezi
                        </Typography>
                        <div>
                            <Tooltip content="Havuzlu Otel">
                                <i className="fa-solid fa-water-ladder cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Açık Büfe">
                                <i className="fa-solid fa-mug-saucer cursor-pointer"></i>
                            </Tooltip>
                        </div>
                    </div>

                    <Typography variant="paragraph" color="gray" className="text-sm bg-gray-50/10 p-2 h-full flex items-center">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid at aut corporis culpa,
                        deserunt dolor enim error excepturi fugiat impedit nobis numquam obcaecati officiis quasi
                        quisquam repudiandae similique velit.
                    </Typography>
                </div>

                <div className="flex flex-col justify-between items-end">
                    <div className="flex flex-col gap-2 items-end">
                        <Chip value="%9 İndirim" color="teal"/>
                        <div>
                            <span className="text-sm line-through"> 1.200 TL</span>
                            <span className="text-2xl font-bold"> 1.500 TL</span>
                        </div>
                        <Typography color="gray" variant="h6" className="text-right ">
                            The price includes taxes and fees for one night.
                        </Typography>
                    </div>
                    <CustomButton text="Detayları Gör" color="lightBlue" variant="filled" size="sm" link="/product/1"/>
                </div>


            </CardBody>
        </Card>
    );
}