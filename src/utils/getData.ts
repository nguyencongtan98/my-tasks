export const getColor = (statusId: number): string => {
    let bgColor = "d"
    switch (statusId) {
        case 1:
            bgColor = "#6d24e3"
            break;
        case 2:
            bgColor = "#dbbd5a"
            break;
        case 3:
            bgColor = "#9fe09d"
            break;
        case 4:
            bgColor = "darkGray"
            break;
        case 5:
            bgColor = "6d24e3"
            break;
        default:
            break;
    }
    return bgColor;

}