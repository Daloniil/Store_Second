import {useItems} from "@/hooks/useItems";
import {useEffect} from "react";

const EnterPage = () => {

    const {itemHook, getItem} = useItems();

    useEffect(() => {
        getItem('type')
    }, [])

    return <div>
        {itemHook.map((item) => {
            return (
                <div key={item.id}>
                    {/*{item.name}*/}
                    <button style={{
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        padding: '10px',
                        fontSize: '25px',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}>Click
                    </button>
                </div>
            )
        })}
    </div>
}

export default EnterPage
