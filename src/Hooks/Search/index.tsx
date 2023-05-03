import { Iprojects } from "../../App";

export type BSearch = ( array: Iprojects[], target: string, left: number, right: number ) => Iprojects[] | 'Not Found!' | BSearch;

function Search(array: Iprojects[], target: string) {
  
  const BinarySearch: BSearch = ( array, target, left, right ) => {
    if( right < left ) return 'Not Found!';

    let Target = target.replace(' ', '');
    Target = Target.toLowerCase();
    
    const middle = Math.floor( ( left + right ) / 2 );

    let currentIndex = array[ middle ].name.replace(' ', '');
    currentIndex = currentIndex.toLowerCase();
  
    if( currentIndex === Target || currentIndex.includes( Target ) ) {
      const resultArr: Iprojects[] = []
      resultArr.push( array[ middle ] )
      return resultArr;
    }
  
    if( Target < currentIndex ) return BinarySearch( array, target, left, middle - 1 );
  
    return BinarySearch( array, target, middle + 1, right );
  }
  
  return BinarySearch( array, target , 0, array.length - 1 );
}

export default Search;