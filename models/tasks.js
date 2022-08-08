const Task = require('./task');


class Tasks {

    _list = {};

    get arrayList(){

        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push( task );
           });

        return list;   
    }

    constructor(){
        
        this._list = {};
    }

    
    addTask( description = '' ){

        const task = new Task( description );
        this._list[task.id] = task;
    }

    deleteTask( id = '' ){

        if( this._list[id] ){

            delete this._list[id];

        }
    }

    loadTasksArray ( tasks = [] ){

        tasks.forEach( data =>{
            this._list[data.id] = data; 
        })
       

    } 

    completedTasksList(){

        console.log();
        if( this.arrayList.length > 0 ){
            this.arrayList.forEach( (task, i) => {

                const index = `${ i+1 }`.magenta;
                const { description, completedDate } = task;
    
                const status = ( completedDate ) ? 'Completada'.green
                                                 : 'Pendiente'.red;
    
                console.log( `${ index }. ${ description } :: ${ status }` );                                
    
            });
        }else{
            console.log('No tienes tareas agregadas');
        }
        
    }

    taskStatusList( statusTask = true ){

        console.log();
        let counter = 0;
        this.arrayList.forEach( task => {

            const { description, completedDate } = task;

            const status = ( completedDate ) ? 'Completada'.green
                                             : 'Pendiente'.red;

            if( statusTask ) {

                if( completedDate ){

                    counter += 1;
                    console.log( `${ (counter.toString()+'.').magenta} ${ description } :: ${ completedDate.magenta }` );
    
                } 

            }else{

                if( !completedDate ){

                    counter += 1;
                    console.log( `${ (counter.toString()+'.').magenta}. ${ description } :: ${ status }` );
    
                }
            }                                                               

        });

        if( counter == 0 && statusTask == true ){
            console.log('No tienes Tareas Completadas');

        }else if ( counter == 0 && statusTask == false ) {
            console.log('No tienes tareas pendientes');
            
        }
    }

    toggleCompleted( ids = [] ){

        ids.forEach( id => {

            const task = this._list[id];
            if( !task.completedDate ) {
                task.completedDate = new Date().toDateString();
            }
        });

        this.arrayList.forEach( task =>{

            if( !ids.includes(task.id) ){
                this._list[task.id].completedDate = null;
            }

        });
    }

}


module.exports = Tasks;