import * as React from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    ListButton,
    RefreshButton,
    ArrayField,
    SingleFieldList,
    ChipField,
    Datagrid,
    DateField,
    ExportButton
} from 'react-admin';
import jsonExport from 'jsonexport';
import BackButton from "../BackButton";
import SimpleBar from "simplebar-react";

const exporter = (services) => {
    const servicesForExport = services.services.map(service => {
        const {_id, updatedAt, createdAt, __v, client, ...servicesForExport} = service;
        servicesForExport.Nome = services.name;
        servicesForExport.Protocolo = service.protocol;
        servicesForExport.Serviço = service.service[0].name;
        servicesForExport.Preço = service.service[0].price;
        servicesForExport.Modelo = service.carBrand;
        servicesForExport.Placa = service.licensePlate;
        servicesForExport.Cor = service.color;
        servicesForExport.Desconto = service.discount;
        servicesForExport.Total = 'R$ ' + `${service.service[0].price - service.discount}` + ',00';
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

        return servicesForExport;
    })
    jsonExport(servicesForExport, {
        headers: ['Protocolo', 'Status', 'Nome', 'Serviço', 'Modelo', 'Placa', 'Cor', 'Data', 'Método', 'Observação', 'Preço', 'Desconto', 'Total'],
        rowDelimiter: ';',
    }, (err, csv) => {
        let link = window.document.createElement("a");
        link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv.toString()));
        link.setAttribute("download", `Serviços - ${services.name}.csv`);
        link.click();
    });
};

const ClientShowActions = ({basePath, data}) => {
    return <TopToolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
            <BackButton
                color='secondary'
            >
                Voltar
            </BackButton>
        </div>
        <div>
            <ListButton basePath={basePath} record={data}/>
            <RefreshButton basePath={basePath} onClick={() => document.location.reload(true)}/>
            <ExportButton basePath={'/cars?populate=clients'} onClick={() => exporter(data)}/>
        </div>
    </TopToolbar>
};

const FieldChipPrice = ({record}) => {
    return <span style={{
        display: 'flex',
        backgroundColor: 'rgb(224, 224, 224)',
        borderRadius: '16px',
        height: '25px',
        width: '50px',
        padding: '3px',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3px'
    }}>R$ {record.price}</span>
};

const FieldChipDiscount = ({record}) => {
    return <span style={{
        display: 'flex',
        backgroundColor: 'rgb(224, 224, 224)',
        borderRadius: '16px',
        height: '25px',
        width: '50px',
        padding: '3px',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    }}>R$ {record.discount}</span>
};

const TotalSpentField = ({record}) => {
    let total = 0;
    record.services.map((service) => {
        if (service.status !== "Em aberto" && service.status !== "Atrasado") {
            service.service.map((price) => {
                total += price.price;
            })
            total -= service.discount;
        }
    })
    return <span>R$ {total}</span>
};

const TotalDebitField = ({record}) => {
    let total = 0;
    record.services.map((service) => {
        if (service.status === "Em aberto" || service.status === "Atrasado") {
            service.service.map((price) => {
                total += price.price;
            })
            total -= service.discount;
        }
    })
    return <span>R$ {total}</span>
};

const MostRecentDate = ({record}) => {
    if (record.services[0]) {
        record.services.sort(function (a, b) {
            let c = new Date(a.date);
            let d = new Date(b.date);

            return d - c;
        });
        let mostRecentDate = `${record.services[0].date.substring(8, 10)}/${record.services[0].date.substring(5, 7)}/${record.services[0].date.substring(0, 4)}`;
        return <span>{mostRecentDate}</span>
    } else
        return <h2>Não há nenhum serviço para este cliente ainda!</h2>

};

const ClientShowRowStyle = (record) => ({
    borderLeftColor: record.status === "Faturado" ? 'rgb(66,94,255)' : record.status === "Atrasado" ? 'rgba(255,72,72,0.38)' : record.status === "Em aberto" ? 'rgba(255,255,15,0.79)' : 'rgba(92,255,64,0.38)',
    borderLeftWidth: 5,
    borderLeftStyle: 'solid',
});

export const ClientShow = (props) => (
    <SimpleBar style={{maxHeight: '100%'}}>
        <Show actions={<ClientShowActions/>} {...props}>
            <SimpleShowLayout>
                <ArrayField label="Serviços" source="services">
                    <Datagrid rowStyle={ClientShowRowStyle}>
                        <TextField label="Status" source="status"/>
                        <ArrayField label="Serviços" source="service">
                            <SingleFieldList linkType={false}>
                                <ChipField source="name"/>
                            </SingleFieldList>
                        </ArrayField>
                        <ArrayField label="Preço" source="service">
                            <SingleFieldList linkType={false}>
                                <FieldChipPrice/>
                            </SingleFieldList>
                        </ArrayField>
                        <TextField label="Placa" source="licensePlate"/>
                        <TextField label="Modelo" source="carBrand"/>
                        <TextField label="Cor" source="color"/>
                        <FieldChipDiscount label="Desconto" source="discount"/>
                        <DateField label="Data" source="date"/>
                        <TextField label="Método" source="paymentMethod"/>
                    </Datagrid>
                </ArrayField>
                <p style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: '0',
                    fontSize: '0.76rem',
                    fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '0.00938em',
                    marginTop: '15px',
                    marginBottom: '10px',
                }}>
                    Último Comparecimento
                </p>
                <MostRecentDate/>
                <p style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: '0',
                    fontSize: '0.76rem',
                    fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '0.00938em',
                    marginTop: '15px',
                    marginBottom: '10px',
                }}>
                    Total Devido
                </p>
                <TotalDebitField/>
                <p style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: '0',
                    fontSize: '0.76rem',
                    fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '0.00938em',
                    marginTop: '15px',
                    marginBottom: '10px',
                }}>
                    Total Pago
                </p>
                <TotalSpentField/>
            </SimpleShowLayout>
        </Show>
    </SimpleBar>
);
