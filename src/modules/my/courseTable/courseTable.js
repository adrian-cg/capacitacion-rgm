import LightningDatatable from 'lightning/datatable';
import cellHelpText from './cellHelpText.html';

export default class CourseTable extends LightningDatatable {
    static customTypes = {
        helpText: {
            template: cellHelpText,
            typeAttributes: ['helpText', 'label']
        }
    }
}