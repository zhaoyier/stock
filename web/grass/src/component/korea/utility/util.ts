export const getPkgNumbersBasePkgId = (data: any[], pkgIds: any[]) => {
    return  data
    .filter(item => {
        let returnValue = false;
        for (const val of pkgIds) {
            if ( item.pkgId === val ) {
                returnValue = true;
                return returnValue;
            }
        }
        return returnValue;
    })
    .map(item => item.pkgNumber);
};

