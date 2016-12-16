module app.common {
    export interface IDataManipulationService {
         chunkArray<T>(arr: T[], size: number): Array<Array<T>>;
    }

    export class DataManipulationService implements IDataManipulationService {

        constructor() {}

         chunkArray<T>(arr: T[], size: number): Array<Array<T>> {
             let newSize: number = arr.length / size;
             let newArr: Array<Array<T>> = new Array<Array<T>>();
             for (let i = 0; i < arr.length; i += size)
                 newArr.push(arr.slice(i, i + size));
             return newArr;
         }

    }

    angular
    .module("common.services")
    .service("dataManipulationService", DataManipulationService);
}