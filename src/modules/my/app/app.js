import { LightningElement, track } from 'lwc';
import Papa from 'papaparse';

const columns = [
    {
        label: 'Área',
        fieldName: 'area',
        hideDefaultActions: true,
        wrapText: true
    },
    {
        label: 'Nombre',
        type: 'helpText',
        fieldName: 'link',
        typeAttributes: {
            label: { fieldName: 'nombre' },
            helpText: { fieldName: 'contenido' },
            target: '_blank'
        },
        hideDefaultActions: true,
        wrapText: true
    },
    {
        label: 'Dónde',
        fieldName: 'donde',
        hideDefaultActions: true,
        wrapText: true
    },
    {
        label: 'Tiempo',
        fieldName: 'tiempo',
        hideDefaultActions: true,
        wrapText: true
    },
    {
        label: 'Modalidad',
        fieldName: 'modalidad',
        hideDefaultActions: true,
        wrapText: true
    },
    {
        label: 'Inversión',
        fieldName: 'inversion',
        hideDefaultActions: true,
        wrapText: true
    }
];
export default class App extends LightningElement {
    columns = columns;
    fullData = [];
    data = [];
    loading = true;
    @track areaOptions = [{ label: 'Todas las Áreas', value: 'todas' }];
    areaSet = new Set();
    area = 'todas';

    connectedCallback() {
        const sheetId = '1ZutTJM-IQu264K4jccjzaMws0WGxV8PDC_aDIaxrRkQ';
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/pub?output=csv`;
        Papa.parse(sheetUrl, {
            download: true,
            header: true,
            complete: ({ data }) => {
                for (const row of data) {
                    const parsedRow = {
                        area: row['Área'],
                        nombre: row['Nombre'],
                        donde: row['Dónde'],
                        tiempo: row['Tiempo'],
                        modalidad: row['Modalidad'],
                        inversion: row['Inversión'],
                        link: row['Link'] || '#',
                        contenido: row['Contenido']
                    };
                    this.fullData.push(parsedRow);
                    if (!this.areaSet.has(parsedRow.area)) {
                        this.areaSet.add(parsedRow.area);
                        this.areaOptions.push({
                            label: parsedRow.area,
                            value: parsedRow.area
                        });
                    }
                }
                this.data = [...this.fullData];
                this.loading = false;
            }
        });
    }

    handleAreaChange(e) {
        this.area = e.target.value;
        if (this.area === 'todas') {
            this.data = [...this.fullData];
        } else {
            this.data = this.fullData.filter((row) => row.area === this.area);
        }
    }
}
