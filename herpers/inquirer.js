const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que quieres hacer?',
        choices:[
            {
                value: '1',
                name: '1.'.magenta + ' Crear Tarea'
            },
            {
                value: '2',
                name: '2.'.magenta + ' Completar Tarea(s)'
            },
            {
                value: '3',
                name: '3.'.magenta + ' Borrar Tarea'
            },
            {
                value: '4',
                name: '4.'.magenta + ' Listar Tareas'
            },
            {
                value: '5',
                name: '5.'.magenta + ' Listar Tareas Completadas'
            },
            {
                value: '6',
                name: '6.'.magenta + ' Listar Tareas Pendientes'
            },
            {
                value: '0',
                name: '0.'.magenta + ' Salir'
            },
        ]
    }
]

const inquirerMenu = async() => {

    //console.clear()
    console.log('========================'.magenta);
    console.log('Seleccione una Opción'.white);
    console.log('========================\n'.magenta);

    const { option } = await inquirer.prompt(questions);

    return option;

}

const pause = async() => {

    const question = [
        { 
            type: 'input',
            name: 'pause',
            message: `Presione ${'ENTER'.magenta} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);

}

const readInput = async( msg ) => {

    const query = [
        { 
            type: 'input', 
            name: 'answer',
            message: msg,
            validate( value ){
                if( value.length === 0 ){
                    return 'Ingrese una descripción';
                }
                return true; 
            }
        }
    ];

    const { answer } = await inquirer.prompt( query );
    return answer;
}

const listTaskSDelete = async ( tasks = [] ) => {

    const choices = tasks.map( ( task, i ) => {

        const index = `${ i + 1 }.`.magenta;

        return {
            value: task.id,
            name: `${ index } ${ task.description}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.magenta + ' Cancelar'
    });

    const query = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt( query );
    return id;
    

}

const confirmDeletion = async( message ) => {

    const query = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( query );
    return ok;
}

const tasksCheckList = async( tasks = [] ) => {

    const choices = tasks.map( ( task, i ) => {

        const index = `${ i + 1 }.`.magenta;

        return {
            value: task.id,
            name: `${ index } ${ task.description}`,
            checked: ( task.completedDate ) ? true : false
        }

    });

    const query = [
        {
            type: 'checkbox',
            name: 'options',
            message: 'Selecciones',
            choices
        }
    ];

    const { options } = await inquirer.prompt( query );
    return options;
}

const confirmSelection = async() => {


    const query = [
        {
            type:'confirm',
            name:'ok',
            message: 'Al no seleccionar ninguna todas pasaran a estar en estado pendiente. ¿Desea Continuar?'
        }
    ];

    const { ok } = await inquirer.prompt( query );
    return ok;
    

}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTaskSDelete,
    confirmDeletion,
    tasksCheckList,
    confirmSelection
};