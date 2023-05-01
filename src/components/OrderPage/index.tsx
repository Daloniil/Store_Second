import Image from "next/image";

export const OrderPage = ({items}: any) => {
    return (
        <div>
            {items?.map((item: any) => {
                return (
                    <div key={item.id}>
                        {item.name}
                        <Image src={item.photo} alt={item.name} width={150} height={150}/>
                    </div>
                )
            })}
        </div>
    )
}
