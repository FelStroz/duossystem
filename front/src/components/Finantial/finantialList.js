import * as React from "react";
import Card from '@material-ui/core/Card';
import {useEffect, useState} from "react";
import ReactLoading from "react-loading";
import config from '../../config.json';
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import jsonExport from "jsonexport";
import {ButtonExporter} from './styles';

const spentCardStyle = {
    width: 300,
    minHeight: 150,
    margin: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ivory',
    boxShadow: '0px 0px 1px 1px #dbdee8',
    marginTop: 50,
    marginLeft: 80
};

const servicesCardStyle = {
    width: 300,
    minHeight: 150,
    margin: '0.5em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ivory',
    boxShadow: '0px 0px 1px 1px #dbdee8',
    marginTop: 50,
    marginRight: 80
};

const cardContainerStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const containerInformationCardStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 70,
}

const containerImageCardStyle = {
    width: '100%',
    height: '20%',
}

const containerTextCardStyle = {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
}

const header = {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
}

const informationText = {
    fontSize: '2em',
    fontFamily: 'Montserrat',
}

const containerSubtitleText = {
    width: '100%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
}

const subtitleText = {
    fontSize: '1.1em',
    fontFamily: 'cursive',
    color: 'gray',
    marginLeft: 30
}

const imageCardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginLeft: 30,
    borderRadius: 15,
    backgroundColor: '#f8f8ff',
    boxShadow: '0px 0px 5px 2px rgb(0,0,0,0.2)'
}

const containerExporter = {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginRight: 80
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const exporter = (services, timestamp) => {
    let timeString;
    (timestamp === "year") ? timeString = "Ano" : (timestamp === "month") ? timeString = "Mês" : timeString = "Dia";
    if (services.length >= 1) {
        let allServices = [];
        for (let serv in services) {
            let servicesForExport = {}, total = 0;
            let service = services[serv];
            for (let namePrice of service.service) {
                if (!servicesForExport.Serviço)
                    servicesForExport.Serviço = namePrice.name;
                else
                    servicesForExport.Serviço += "/" + namePrice.name;
                total += namePrice.price;
            }
            delete service._id;
            delete service.updatedAt;
            delete service.createdAt;
            delete service.__v;
            delete service.client;

            servicesForExport.Nome = service.nameClient;
            servicesForExport.Protocolo = service.protocol;
            servicesForExport.Preço = 'R$ ' + `${total}` + ',00';
            servicesForExport.Modelo = service.carBrand;
            servicesForExport.Placa = service.licensePlate;
            servicesForExport.Cor = service.color;
            servicesForExport.Desconto = 'R$ ' + `${service.discount}` + ',00';
            servicesForExport.Total = 'R$ ' + `${total - service.discount}` + ',00';
            servicesForExport.Data = `${new Date(service.date).toLocaleDateString()}`;
            servicesForExport.Observação = (service.observation !== "") ? service.observation : "Sem observação";
            servicesForExport.Método = service.paymentMethod;
            servicesForExport.Status = service.status;

            delete servicesForExport.observation;
            delete servicesForExport.status;
            delete servicesForExport.protocol;
            delete servicesForExport.date;
            delete servicesForExport.paymentMethod;
            delete servicesForExport.licensePlate;
            delete servicesForExport.carBrand
            delete servicesForExport.color;
            delete servicesForExport.observation;
            delete servicesForExport.discount;
            delete servicesForExport.service;
            delete servicesForExport.nameClient;

            allServices.push(servicesForExport);
        }
        jsonExport(allServices, {
            headers: ['Protocolo', 'Status', 'Nome', 'Serviço', 'Modelo', 'Placa', 'Cor', 'Data', 'Método', 'Observação', 'Preço', 'Desconto', 'Total'],
            rowDelimiter: ';',
        }, (err, csv) => {
            let link = window.document.createElement("a");
            link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv.toString()));
            link.setAttribute("download", `Faturamento no ${timeString} ${(new Date().getUTCMonth() + 1 < 10)? `0${new Date().getUTCMonth() + 1}` : new Date().getUTCMonth() + 1}.csv`);
            link.click();
        });
    } else {
        alert("Não há serviços para exportar!");
    }
};

async function getFinances(timestamp = "year") {

    let url = `${config.backUrl}/finantial?timestamp=${timestamp}`;
    let headers = {'Content-Type': "application/json", authorization: `Bearer ${localStorage.getItem("authToken")}`};

    let response = await fetch(url, {method: 'GET', headers}).catch((e) => console.log(e));

    if (response.status !== 200) return Promise.reject(await response.json());
    let json;

    try {
        json = await response.json();
    } catch (e) {
        return Promise.reject('Erro desconhecido, tente novamente mais tarde.');
    }

    return json;
}

const FinantialList = () => {
    const classes = useStyles();
    let [isLoading, setIsLoading] = useState(true);
    let [list, setList] = useState({totalPayed: 0});
    let [timestamp, setTimestamp] = React.useState('');

    const handleChange = (event) => {
        setTimestamp(event.target.value);
        getFinances(event.target.value).then((data) => {
            setList(data);
            setIsLoading(false);
        }).catch(e => {
            setIsLoading(false);
        });
    };

    const handleMouseOut = () => {
        document.querySelector('#root > div > div > div > main > div.makeStyles-content-6 > div > div:nth-child(2) > div').firstChild.style.display = "none"
    }
    const handleMouseOver = () => {
        document.querySelector('#root > div > div > div > main > div.makeStyles-content-6 > div > div:nth-child(2) > div').firstChild.style.display = "flex"
    }

    useEffect(() => {
        setIsLoading(true);
        getFinances("day").then((data) => {
            setList(data);
            setIsLoading(false);
        }).catch(e => {
            setIsLoading(false);
        });
    }, []);

    return <Card style={cardContainerStyle}>
        <div style={{width: '100%'}}>
            <div style={header}>
                <h1 style={{fontFamily: 'cursive', fontSize: '2em', marginLeft: 80}}>Área Financeira</h1>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="select-outlined-label">Tempo</InputLabel>
                    <Select
                        labelId="select-outlined-label"
                        id="select-outlined"
                        value={timestamp}
                        onChange={handleChange}
                        label="Tempo"
                    >
                        <MenuItem value="">
                            <em>Nenhum</em>
                        </MenuItem>
                        <MenuItem value={"day"}>Dia</MenuItem>
                        <MenuItem value={"month"}>Mês</MenuItem>
                        <MenuItem value={"year"}>Ano</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {(!isLoading) ?
                <div style={containerInformationCardStyle}>
                    <Card style={spentCardStyle}>
                        <div style={containerImageCardStyle}>
                            <div style={imageCardStyle}>
                                <AttachMoneyIcon style={{color: '#26d49b'}}/>
                            </div>
                        </div>
                        <div style={containerTextCardStyle}>
                            <p style={informationText}>R$ {list.totalPayed}</p>
                        </div>
                        <div style={containerSubtitleText}>
                            <h3 style={subtitleText}>Faturamento Bruto</h3>
                        </div>
                    </Card>
                    <Card style={servicesCardStyle}>
                        <div style={containerImageCardStyle}>
                            <div style={{...imageCardStyle, cursor: 'pointer'}}
                                 onClick={() => window.location.replace("http://localhost:3000/admin#/cars")}>
                                <LocalCarWashIcon style={{color: '#298bff'}}/>
                            </div>
                        </div>
                        <div style={containerTextCardStyle}>
                            <p style={informationText}>{list.totalServices}</p>
                        </div>
                        <div style={containerSubtitleText}>
                            <h3 style={subtitleText}>Serviços Prestados</h3>
                        </div>
                    </Card>
                </div>
                :
                <div style={containerInformationCardStyle}>
                    <ReactLoading type="spin" color="black" width={200} height={30}/>
                    <ReactLoading type="spin" color="black" width={200} height={30}/>
                </div>}
        </div>
        <div style={containerExporter}>
            <ButtonExporter onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={() => {
                exporter(list.services, timestamp)
            }}>
                <div style={{display: 'none', marginRight: '5px'}}>
                    <p>Gerar Excel</p>
                </div>
                <img src="https://img.icons8.com/fluent-systems-filled/36/000000/window-excel.png" alt={"Loading..."}/>
            </ButtonExporter>
        </div>
    </Card>
};

export default FinantialList;
