/* eslint-disable */

const wordsSet = new Set();





const cosSimilarity = (array1, array2) => {
  

	var i, j, arrayLength1, arrayLength2, flag,
	conj1 = [], conj2 = [], contIntersec;
	arrayLength1 = palavras1.length;
	for(i = 0; i < arrayLength1; i++) {
		if (palavras1[i].canonica != "") {
			arrayLength2 = conj1.length;
			flag = true;
			for(j = 0; j < arrayLength2; j++) {
				if (palavras1[i].canonica == conj1[j]) {
					flag = false;
					break;
				}
			}
			if (flag) {
				conj1[arrayLength2] = palavras1[i].canonica;
			}
		}
	}
	arrayLength1 = palavras2.length;
	for(i = 0; i < arrayLength1; i++) {
		if (palavras2[i].canonica != "") {
			arrayLength2 = conj2.length;
			flag = true;
			for(j = 0; j < arrayLength2; j++) {
				if (palavras2[i].canonica == conj2[j]) {
					flag = false;
					break;
				}
			}
			if (flag) {
				conj2[arrayLength2] = palavras2[i].canonica;
			}
		}
	}
	
	arrayLength1 = conj1.length;
	arrayLength2 = conj2.length;
	contIntersec = 0;
	for(i = 0; i < arrayLength1; i++) {
		for(j = 0; j < arrayLength2; j++) {
			if (conj1[i] == conj2[j]) {
				contIntersec++;
			}
		}
	}
	return contIntersec / (Math.sqrt(arrayLength1)*Math.sqrt(arrayLength2)); 
	
}
