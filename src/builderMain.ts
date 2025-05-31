import { CakeBuilder } from './model/builders/Cake.builder';
import { ToyBuilder } from './model/builders/Toy.builder';
import { BookBuilder } from './model/builders/Book.builder';

async function main() {
    const cake = new CakeBuilder().
        setType('Birthday')
        .setFlavor('Chocolate')
        .setFilling('Vanilla')
        .setSize(2)
        .setLayers(3)
        .setFrostingType('Buttercream')
        .setFrostingFlavor('Vanilla')
        .setDecorationType('Edible Flowers')
        .setDecorationColor('Pink')
        .setCustomMessage('Happy Birthday!')
        .setShape('Round')
        .setAllergies('None')
        .setSpecialIngredients('Organic Cocoa')
        .setPackagingType('Box').build();
    console.log(cake);

    const toy = new ToyBuilder().
        setType('Action Figure')
        .setMaterial('Plastic')
        .setAgeGroup('3+')
        .setBrand('ToyBrand')
        .setBatteryRequired(false)
        .setEducational(true)
        .build();
    console.log(toy);

    const book = new BookBuilder().
        setTitle('The Great Book')
        .setAuthor('John Doe')
        .setGenre('Fiction')
        .setFormat('Hardcover')
        .setLanguage('English')
        .setPublisher('Great Publishing')
        .setSpecialEdition('Illustrated Edition')
        .setPackaging('Standard')
        .build();
    console.log(book);
}

main();