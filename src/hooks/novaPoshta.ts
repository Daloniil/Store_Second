import axios from 'axios';


export const useNovaPoshta = () => {
    const API_KEY = '43413bd0167a421771d6d117e48e5d37'


    const getCities = (city: string) => axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: API_KEY,
        modelName: 'AddressGeneral',
        calledMethod: 'searchSettlements',
        methodProperties: {
            CityName: city,
        }
    }).then(response => {
        return response.data
    })
        .catch(error => {
            console.error(error);
        });


    const getWarehouses = (city: string) => axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: API_KEY,
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: {
            CityName: city,
            TypeOfWarehouseRef:"841339c7-591a-42e2-8233-7a0a00f0ed6f"
        }
    }).then(response => {
        return (response.data)
    })
        .catch(error => {
            console.error(error);
        });


    return {getCities, getWarehouses};
}