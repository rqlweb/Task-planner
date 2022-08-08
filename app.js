require('colors');

//const { showMenu, pause } = require('./herpers/messages');
const { inquirerMenu, pause, readInput, listTaskSDelete, confirmDeletion, tasksCheckList, confirmSelection } = require('./herpers/inquirer');
const { saveDB, seeDB } = require('./herpers/saveFile');
const Tasks = require('./models/tasks');




console.clear();

const main = async() => {

    let option = '';
    const tasks = new Tasks();

    const tasksDB = seeDB();
    //console.log(tasksDB);

    if( tasksDB ){
      tasks.loadTasksArray( tasksDB );
    }

    do{

       //option = await showMenu(); 
       option = await inquirerMenu();
       //console.log(option);

       switch( option ){

         case '1':
            const desc = await readInput('Indique la Tarea: ');
            //console.log(desc);
            tasks.addTask( desc );
         break; 

         case '2':
            const ids = await tasksCheckList( tasks.arrayList );
            //console.log(ids);
            if( ids.length == 0){
               const confirm = await confirmSelection();
               if( confirm ){
                  tasks.toggleCompleted( ids ); 
               }
            }else{

               tasks.toggleCompleted( ids );
            }
         break;

         case '3':
            const id = await listTaskSDelete( tasks.arrayList );
            //console.log(id);
            if( id !== '0' ){

               const confirm = await confirmDeletion( '¿Estas Seguro?' );
               if( confirm ){
                  tasks.deleteTask(id);
                  console.log('Tarea Borrada');
               }

            }  
         break;

         case '4':
            tasks.completedTasksList();
         break;

         case '5':
            tasks.taskStatusList( true );
         break;

         case '6':
            tasks.taskStatusList( false );
         break;

       }

       saveDB( tasks.arrayList);
 
       await pause();

    }while( option !== '0' );

}

main();