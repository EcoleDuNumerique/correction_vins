export class APIService {

    private static instance: APIService = null;
    private url:string = "http://192.168.110.52/courses_typescript/vendor_products/API/";

    static getService(): APIService {

        if( !APIService.instance )
            APIService.instance = new APIService();

        return APIService.instance;
    }

    private constructor(){}

    getWines(): Promise<{}> {
        
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.url + "wines",
                dataType:"json",
                success: ( wines: {} ) => {
                    resolve( wines );
                },
                error: ( error ) => {
                    reject( error );
                }
            });
        })

    }

}