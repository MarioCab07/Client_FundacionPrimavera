let navigateFn = null;

export const setNavigator = (nav) =>{navigateFn = nav};
export const navigate = (...args)=>{
    if(navigateFn) navigateFn(...args);
};