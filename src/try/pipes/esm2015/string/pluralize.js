import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { isVowel } from '../helpers/helpers';
let MakePluralStringPipe = 
/**
 * Takes a singular entity string and pluralizes it.
 * Uses both naive and holdout-list approaches.
 * If several words appear in the string, only the last word is pluralized -- this
 * means that if 'your story' was passed in, 'your stories' would be passed out.
 * @constructor
 * @param {string} singularEntity - Entity to pluralize. Pass as a singular ('story' or 'house').
 *          NOTE: The last word is examined. So you can pass in e.g. 'my story'.
 * @param {number} [quantity=0] quantity - How many of the entity are there? If left blank, this will
 *          pluralize the string (e.g. 'story' -> 'stories', 'house' -> 'houses'). If given a value,
 *          this will pluralize appropriately (e.g. ('story', 1) -> 'story', ('story', 2) -> 'stories').
 */
class MakePluralStringPipe {
    constructor() {
        this.irregularMap = {
            addendum: 'addenda',
            alga: 'algae',
            alumna: 'alumnae',
            alumnus: 'alumni',
            analysis: 'analyses',
            antenna: 'antennae',
            appendix: 'appendices',
            aquarium: 'aquaria',
            arch: 'arches',
            axe: 'axes',
            axis: 'axes',
            bacillus: 'bacilli',
            bacterium: 'bacteria',
            basis: 'bases',
            batch: 'batches',
            beach: 'beaches',
            beau: 'beaux',
            bison: 'bison',
            brush: 'brushes',
            buffalo: 'buffaloes',
            bureau: 'bureaus',
            bus: 'busses',
            cactus: 'cacti',
            calf: 'calves',
            chateau: 'chateaux',
            cherry: 'cherries',
            child: 'children',
            church: 'churches',
            circus: 'circuses',
            cod: 'cod',
            corps: 'corps',
            corpus: 'corpora',
            crisis: 'crises',
            criterion: 'criteria',
            curriculum: 'curricula',
            datum: 'data',
            deer: 'deer',
            diagnosis: 'diagnoses',
            die: 'dice',
            domino: 'dominoes',
            dwarf: 'dwarves',
            echo: 'echoes',
            elf: 'elves',
            ellipsis: 'ellipses',
            embargo: 'embargoes',
            emphasis: 'emphases',
            erratum: 'errata',
            fax: 'faxes',
            fireman: 'firemen',
            fish: 'fish',
            flush: 'flushes',
            focus: 'foci',
            foot: 'feet',
            formula: 'formulas',
            fungus: 'fungi',
            genus: 'genera',
            goose: 'geese',
            grafito: 'grafiti',
            half: 'halves',
            hero: 'heroes',
            hoax: 'hoaxes',
            hoof: 'hooves',
            hypothesis: 'hypotheses',
            index: 'indices',
            kiss: 'kisses',
            knife: 'knives',
            leaf: 'leaves',
            life: 'lives',
            loaf: 'loaves',
            louse: 'lice',
            man: 'men',
            mango: 'mangoes',
            matrix: 'matrices',
            means: 'means',
            medium: 'media',
            memorandum: 'memoranda',
            millennium: 'milennia',
            moose: 'moose',
            mosquito: 'mosquitoes',
            motto: 'mottoes',
            mouse: 'mice',
            nebula: 'nebulae',
            neurosis: 'neuroses',
            nucleus: 'nuclei',
            oasis: 'oases',
            octopus: 'octopodes',
            ovum: 'ova',
            ox: 'oxen',
            paralysis: 'paralyses',
            parenthesis: 'parentheses',
            person: 'people',
            phenomenon: 'phenomena',
            plateau: 'plateaux',
            potato: 'potatoes',
            quiz: 'quizzes',
            radius: 'radii',
            reflex: 'reflexes',
            'runner-up': 'runners-up',
            scampo: 'scampi',
            scarf: 'scarves',
            scissors: 'scissors',
            scratch: 'scratches',
            self: 'selves',
            series: 'series',
            sheaf: 'sheaves',
            sheep: 'sheep',
            shelf: 'shelves',
            'son-in-law': 'sons-in-law',
            species: 'species',
            splash: 'splashes',
            stimulus: 'stimuli',
            stitch: 'stitches',
            stratum: 'strata',
            syllabus: 'syllabi',
            symposium: 'symposia',
            synopsis: 'synopses',
            synthesis: 'syntheses',
            tableau: 'tableaux',
            tax: 'taxes',
            that: 'those',
            thesis: 'theses',
            thief: 'thieves',
            this: 'these',
            tomato: 'tomatoes',
            tooth: 'teeth',
            tornado: 'tornadoes',
            torpedo: 'torpedoes',
            vertebra: 'vertebrae',
            veto: 'vetoes',
            vita: 'vitae',
            volcano: 'volcanoes',
            waltz: 'waltzes',
            wash: 'washes',
            watch: 'watches',
            wharf: 'wharves',
            wife: 'wives',
            wolf: 'wolves',
            woman: 'women',
            zero: 'zeroes',
        };
    }
    transform(singularEntity, quantity = 0) {
        if (!singularEntity || singularEntity === '') {
            return '';
        }
        if (quantity === 1) {
            return singularEntity;
        }
        else {
            const lastWord = singularEntity.trim().split(' ')[singularEntity.trim().split(' ').length - 1];
            if (this.irregularMap[lastWord.toLocaleLowerCase()]) {
                if (lastWord[0] === lastWord[0].toLocaleUpperCase()) {
                    return singularEntity.replace(lastWord, this.irregularMap[lastWord.toLocaleLowerCase()].replace(this.irregularMap[lastWord.toLocaleLowerCase()][0], this.irregularMap[lastWord.toLocaleLowerCase()][0].toLocaleUpperCase()));
                }
                return singularEntity.replace(lastWord, this.irregularMap[lastWord.toLocaleLowerCase()]);
            }
            else if (lastWord[lastWord.length - 1] === 'y') {
                // Naive approach:
                // consonant+y = word - 'y' +'ies'
                // vowel+y = word + 's'
                return isVowel(lastWord[lastWord.length - 2])
                    ? singularEntity + 's'
                    : singularEntity.replace(lastWord, lastWord.slice(0, -1) + 'ies');
            }
            else if (lastWord[lastWord.length - 1] === 's') {
                return singularEntity + 'es';
            }
            else {
                return singularEntity + 's';
            }
        }
    }
};
MakePluralStringPipe = tslib_1.__decorate([
    Pipe({
        name: 'make-plural-string',
    })
    /**
     * Takes a singular entity string and pluralizes it.
     * Uses both naive and holdout-list approaches.
     * If several words appear in the string, only the last word is pluralized -- this
     * means that if 'your story' was passed in, 'your stories' would be passed out.
     * @constructor
     * @param {string} singularEntity - Entity to pluralize. Pass as a singular ('story' or 'house').
     *          NOTE: The last word is examined. So you can pass in e.g. 'my story'.
     * @param {number} [quantity=0] quantity - How many of the entity are there? If left blank, this will
     *          pluralize the string (e.g. 'story' -> 'stories', 'house' -> 'houses'). If given a value,
     *          this will pluralize appropriately (e.g. ('story', 1) -> 'story', ('story', 2) -> 'stories').
     */
], MakePluralStringPipe);
export { MakePluralStringPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1cmFsaXplLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRyeS9waXBlcy8iLCJzb3VyY2VzIjpbInN0cmluZy9wbHVyYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWtCN0MsSUFBYSxvQkFBb0I7QUFaakM7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFhLG9CQUFvQjtJQWhCakM7UUFpQlUsaUJBQVksR0FBUTtZQUMxQixRQUFRLEVBQUUsU0FBUztZQUNuQixJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLElBQUksRUFBRSxRQUFRO1lBQ2QsR0FBRyxFQUFFLE1BQU07WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLFNBQVM7WUFDaEIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEdBQUcsRUFBRSxRQUFRO1lBQ2IsTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSxVQUFVO1lBQ25CLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLEdBQUcs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QUNGLENBQUE7QUFuTFksb0JBQW9CO0lBaEJoQyxJQUFJLENBQUM7UUFDSixJQUFJLEVBQUUsb0JBQW9CO0tBQzNCLENBQUM7SUFFRjs7Ozs7Ozs7Ozs7T0FXRztHQUNVLG9CQUFvQixDQW1MaEM7U0FuTFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNWb3dlbCB9IGZyb20gJy4uL2hlbHBlcnMvaGVscGVycyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ21ha2UtcGx1cmFsLXN0cmluZycsXG59KVxuXG4vKipcbiAqIFRha2VzIGEgc2luZ3VsYXIgZW50aXR5IHN0cmluZyBhbmQgcGx1cmFsaXplcyBpdC5cbiAqIFVzZXMgYm90aCBuYWl2ZSBhbmQgaG9sZG91dC1saXN0IGFwcHJvYWNoZXMuXG4gKiBJZiBzZXZlcmFsIHdvcmRzIGFwcGVhciBpbiB0aGUgc3RyaW5nLCBvbmx5IHRoZSBsYXN0IHdvcmQgaXMgcGx1cmFsaXplZCAtLSB0aGlzXG4gKiBtZWFucyB0aGF0IGlmICd5b3VyIHN0b3J5JyB3YXMgcGFzc2VkIGluLCAneW91ciBzdG9yaWVzJyB3b3VsZCBiZSBwYXNzZWQgb3V0LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc2luZ3VsYXJFbnRpdHkgLSBFbnRpdHkgdG8gcGx1cmFsaXplLiBQYXNzIGFzIGEgc2luZ3VsYXIgKCdzdG9yeScgb3IgJ2hvdXNlJykuXG4gKiAgICAgICAgICBOT1RFOiBUaGUgbGFzdCB3b3JkIGlzIGV4YW1pbmVkLiBTbyB5b3UgY2FuIHBhc3MgaW4gZS5nLiAnbXkgc3RvcnknLlxuICogQHBhcmFtIHtudW1iZXJ9IFtxdWFudGl0eT0wXSBxdWFudGl0eSAtIEhvdyBtYW55IG9mIHRoZSBlbnRpdHkgYXJlIHRoZXJlPyBJZiBsZWZ0IGJsYW5rLCB0aGlzIHdpbGxcbiAqICAgICAgICAgIHBsdXJhbGl6ZSB0aGUgc3RyaW5nIChlLmcuICdzdG9yeScgLT4gJ3N0b3JpZXMnLCAnaG91c2UnIC0+ICdob3VzZXMnKS4gSWYgZ2l2ZW4gYSB2YWx1ZSxcbiAqICAgICAgICAgIHRoaXMgd2lsbCBwbHVyYWxpemUgYXBwcm9wcmlhdGVseSAoZS5nLiAoJ3N0b3J5JywgMSkgLT4gJ3N0b3J5JywgKCdzdG9yeScsIDIpIC0+ICdzdG9yaWVzJykuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYWtlUGx1cmFsU3RyaW5nUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwcml2YXRlIGlycmVndWxhck1hcDogYW55ID0ge1xuICAgIGFkZGVuZHVtOiAnYWRkZW5kYScsXG4gICAgYWxnYTogJ2FsZ2FlJyxcbiAgICBhbHVtbmE6ICdhbHVtbmFlJyxcbiAgICBhbHVtbnVzOiAnYWx1bW5pJyxcbiAgICBhbmFseXNpczogJ2FuYWx5c2VzJyxcbiAgICBhbnRlbm5hOiAnYW50ZW5uYWUnLFxuICAgIGFwcGVuZGl4OiAnYXBwZW5kaWNlcycsXG4gICAgYXF1YXJpdW06ICdhcXVhcmlhJyxcbiAgICBhcmNoOiAnYXJjaGVzJyxcbiAgICBheGU6ICdheGVzJyxcbiAgICBheGlzOiAnYXhlcycsXG4gICAgYmFjaWxsdXM6ICdiYWNpbGxpJyxcbiAgICBiYWN0ZXJpdW06ICdiYWN0ZXJpYScsXG4gICAgYmFzaXM6ICdiYXNlcycsXG4gICAgYmF0Y2g6ICdiYXRjaGVzJyxcbiAgICBiZWFjaDogJ2JlYWNoZXMnLFxuICAgIGJlYXU6ICdiZWF1eCcsXG4gICAgYmlzb246ICdiaXNvbicsXG4gICAgYnJ1c2g6ICdicnVzaGVzJyxcbiAgICBidWZmYWxvOiAnYnVmZmFsb2VzJyxcbiAgICBidXJlYXU6ICdidXJlYXVzJyxcbiAgICBidXM6ICdidXNzZXMnLFxuICAgIGNhY3R1czogJ2NhY3RpJyxcbiAgICBjYWxmOiAnY2FsdmVzJyxcbiAgICBjaGF0ZWF1OiAnY2hhdGVhdXgnLFxuICAgIGNoZXJyeTogJ2NoZXJyaWVzJyxcbiAgICBjaGlsZDogJ2NoaWxkcmVuJyxcbiAgICBjaHVyY2g6ICdjaHVyY2hlcycsXG4gICAgY2lyY3VzOiAnY2lyY3VzZXMnLFxuICAgIGNvZDogJ2NvZCcsXG4gICAgY29ycHM6ICdjb3JwcycsXG4gICAgY29ycHVzOiAnY29ycG9yYScsXG4gICAgY3Jpc2lzOiAnY3Jpc2VzJyxcbiAgICBjcml0ZXJpb246ICdjcml0ZXJpYScsXG4gICAgY3VycmljdWx1bTogJ2N1cnJpY3VsYScsXG4gICAgZGF0dW06ICdkYXRhJyxcbiAgICBkZWVyOiAnZGVlcicsXG4gICAgZGlhZ25vc2lzOiAnZGlhZ25vc2VzJyxcbiAgICBkaWU6ICdkaWNlJyxcbiAgICBkb21pbm86ICdkb21pbm9lcycsXG4gICAgZHdhcmY6ICdkd2FydmVzJyxcbiAgICBlY2hvOiAnZWNob2VzJyxcbiAgICBlbGY6ICdlbHZlcycsXG4gICAgZWxsaXBzaXM6ICdlbGxpcHNlcycsXG4gICAgZW1iYXJnbzogJ2VtYmFyZ29lcycsXG4gICAgZW1waGFzaXM6ICdlbXBoYXNlcycsXG4gICAgZXJyYXR1bTogJ2VycmF0YScsXG4gICAgZmF4OiAnZmF4ZXMnLFxuICAgIGZpcmVtYW46ICdmaXJlbWVuJyxcbiAgICBmaXNoOiAnZmlzaCcsXG4gICAgZmx1c2g6ICdmbHVzaGVzJyxcbiAgICBmb2N1czogJ2ZvY2knLFxuICAgIGZvb3Q6ICdmZWV0JyxcbiAgICBmb3JtdWxhOiAnZm9ybXVsYXMnLFxuICAgIGZ1bmd1czogJ2Z1bmdpJyxcbiAgICBnZW51czogJ2dlbmVyYScsXG4gICAgZ29vc2U6ICdnZWVzZScsXG4gICAgZ3JhZml0bzogJ2dyYWZpdGknLFxuICAgIGhhbGY6ICdoYWx2ZXMnLFxuICAgIGhlcm86ICdoZXJvZXMnLFxuICAgIGhvYXg6ICdob2F4ZXMnLFxuICAgIGhvb2Y6ICdob292ZXMnLFxuICAgIGh5cG90aGVzaXM6ICdoeXBvdGhlc2VzJyxcbiAgICBpbmRleDogJ2luZGljZXMnLFxuICAgIGtpc3M6ICdraXNzZXMnLFxuICAgIGtuaWZlOiAna25pdmVzJyxcbiAgICBsZWFmOiAnbGVhdmVzJyxcbiAgICBsaWZlOiAnbGl2ZXMnLFxuICAgIGxvYWY6ICdsb2F2ZXMnLFxuICAgIGxvdXNlOiAnbGljZScsXG4gICAgbWFuOiAnbWVuJyxcbiAgICBtYW5nbzogJ21hbmdvZXMnLFxuICAgIG1hdHJpeDogJ21hdHJpY2VzJyxcbiAgICBtZWFuczogJ21lYW5zJyxcbiAgICBtZWRpdW06ICdtZWRpYScsXG4gICAgbWVtb3JhbmR1bTogJ21lbW9yYW5kYScsXG4gICAgbWlsbGVubml1bTogJ21pbGVubmlhJyxcbiAgICBtb29zZTogJ21vb3NlJyxcbiAgICBtb3NxdWl0bzogJ21vc3F1aXRvZXMnLFxuICAgIG1vdHRvOiAnbW90dG9lcycsXG4gICAgbW91c2U6ICdtaWNlJyxcbiAgICBuZWJ1bGE6ICduZWJ1bGFlJyxcbiAgICBuZXVyb3NpczogJ25ldXJvc2VzJyxcbiAgICBudWNsZXVzOiAnbnVjbGVpJyxcbiAgICBvYXNpczogJ29hc2VzJyxcbiAgICBvY3RvcHVzOiAnb2N0b3BvZGVzJyxcbiAgICBvdnVtOiAnb3ZhJyxcbiAgICBveDogJ294ZW4nLFxuICAgIHBhcmFseXNpczogJ3BhcmFseXNlcycsXG4gICAgcGFyZW50aGVzaXM6ICdwYXJlbnRoZXNlcycsXG4gICAgcGVyc29uOiAncGVvcGxlJyxcbiAgICBwaGVub21lbm9uOiAncGhlbm9tZW5hJyxcbiAgICBwbGF0ZWF1OiAncGxhdGVhdXgnLFxuICAgIHBvdGF0bzogJ3BvdGF0b2VzJyxcbiAgICBxdWl6OiAncXVpenplcycsXG4gICAgcmFkaXVzOiAncmFkaWknLFxuICAgIHJlZmxleDogJ3JlZmxleGVzJyxcbiAgICAncnVubmVyLXVwJzogJ3J1bm5lcnMtdXAnLFxuICAgIHNjYW1wbzogJ3NjYW1waScsXG4gICAgc2NhcmY6ICdzY2FydmVzJyxcbiAgICBzY2lzc29yczogJ3NjaXNzb3JzJyxcbiAgICBzY3JhdGNoOiAnc2NyYXRjaGVzJyxcbiAgICBzZWxmOiAnc2VsdmVzJyxcbiAgICBzZXJpZXM6ICdzZXJpZXMnLFxuICAgIHNoZWFmOiAnc2hlYXZlcycsXG4gICAgc2hlZXA6ICdzaGVlcCcsXG4gICAgc2hlbGY6ICdzaGVsdmVzJyxcbiAgICAnc29uLWluLWxhdyc6ICdzb25zLWluLWxhdycsXG4gICAgc3BlY2llczogJ3NwZWNpZXMnLFxuICAgIHNwbGFzaDogJ3NwbGFzaGVzJyxcbiAgICBzdGltdWx1czogJ3N0aW11bGknLFxuICAgIHN0aXRjaDogJ3N0aXRjaGVzJyxcbiAgICBzdHJhdHVtOiAnc3RyYXRhJyxcbiAgICBzeWxsYWJ1czogJ3N5bGxhYmknLFxuICAgIHN5bXBvc2l1bTogJ3N5bXBvc2lhJyxcbiAgICBzeW5vcHNpczogJ3N5bm9wc2VzJyxcbiAgICBzeW50aGVzaXM6ICdzeW50aGVzZXMnLFxuICAgIHRhYmxlYXU6ICd0YWJsZWF1eCcsXG4gICAgdGF4OiAndGF4ZXMnLFxuICAgIHRoYXQ6ICd0aG9zZScsXG4gICAgdGhlc2lzOiAndGhlc2VzJyxcbiAgICB0aGllZjogJ3RoaWV2ZXMnLFxuICAgIHRoaXM6ICd0aGVzZScsXG4gICAgdG9tYXRvOiAndG9tYXRvZXMnLFxuICAgIHRvb3RoOiAndGVldGgnLFxuICAgIHRvcm5hZG86ICd0b3JuYWRvZXMnLFxuICAgIHRvcnBlZG86ICd0b3JwZWRvZXMnLFxuICAgIHZlcnRlYnJhOiAndmVydGVicmFlJyxcbiAgICB2ZXRvOiAndmV0b2VzJyxcbiAgICB2aXRhOiAndml0YWUnLFxuICAgIHZvbGNhbm86ICd2b2xjYW5vZXMnLFxuICAgIHdhbHR6OiAnd2FsdHplcycsXG4gICAgd2FzaDogJ3dhc2hlcycsXG4gICAgd2F0Y2g6ICd3YXRjaGVzJyxcbiAgICB3aGFyZjogJ3doYXJ2ZXMnLFxuICAgIHdpZmU6ICd3aXZlcycsXG4gICAgd29sZjogJ3dvbHZlcycsXG4gICAgd29tYW46ICd3b21lbicsXG4gICAgemVybzogJ3plcm9lcycsXG4gIH07XG5cbiAgdHJhbnNmb3JtKHNpbmd1bGFyRW50aXR5OiBzdHJpbmcsIHF1YW50aXR5OiBudW1iZXIgPSAwKTogc3RyaW5nIHtcbiAgICBpZiAoIXNpbmd1bGFyRW50aXR5IHx8IHNpbmd1bGFyRW50aXR5ID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlmIChxdWFudGl0eSA9PT0gMSkge1xuICAgICAgcmV0dXJuIHNpbmd1bGFyRW50aXR5O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsYXN0V29yZCA9IHNpbmd1bGFyRW50aXR5LnRyaW0oKS5zcGxpdCgnICcpW3Npbmd1bGFyRW50aXR5LnRyaW0oKS5zcGxpdCgnICcpLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKHRoaXMuaXJyZWd1bGFyTWFwW2xhc3RXb3JkLnRvTG9jYWxlTG93ZXJDYXNlKCldKSB7XG4gICAgICAgIGlmIChsYXN0V29yZFswXSA9PT0gbGFzdFdvcmRbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBzaW5ndWxhckVudGl0eS5yZXBsYWNlKFxuICAgICAgICAgICAgbGFzdFdvcmQsXG4gICAgICAgICAgICB0aGlzLmlycmVndWxhck1hcFtsYXN0V29yZC50b0xvY2FsZUxvd2VyQ2FzZSgpXS5yZXBsYWNlKFxuICAgICAgICAgICAgICB0aGlzLmlycmVndWxhck1hcFtsYXN0V29yZC50b0xvY2FsZUxvd2VyQ2FzZSgpXVswXSxcbiAgICAgICAgICAgICAgdGhpcy5pcnJlZ3VsYXJNYXBbbGFzdFdvcmQudG9Mb2NhbGVMb3dlckNhc2UoKV1bMF0udG9Mb2NhbGVVcHBlckNhc2UoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2luZ3VsYXJFbnRpdHkucmVwbGFjZShsYXN0V29yZCwgdGhpcy5pcnJlZ3VsYXJNYXBbbGFzdFdvcmQudG9Mb2NhbGVMb3dlckNhc2UoKV0pO1xuICAgICAgfSBlbHNlIGlmIChsYXN0V29yZFtsYXN0V29yZC5sZW5ndGggLSAxXSA9PT0gJ3knKSB7XG4gICAgICAgIC8vIE5haXZlIGFwcHJvYWNoOlxuICAgICAgICAvLyBjb25zb25hbnQreSA9IHdvcmQgLSAneScgKydpZXMnXG4gICAgICAgIC8vIHZvd2VsK3kgPSB3b3JkICsgJ3MnXG5cbiAgICAgICAgcmV0dXJuIGlzVm93ZWwobGFzdFdvcmRbbGFzdFdvcmQubGVuZ3RoIC0gMl0pXG4gICAgICAgICAgPyBzaW5ndWxhckVudGl0eSArICdzJ1xuICAgICAgICAgIDogc2luZ3VsYXJFbnRpdHkucmVwbGFjZShsYXN0V29yZCwgbGFzdFdvcmQuc2xpY2UoMCwgLTEpICsgJ2llcycpO1xuICAgICAgfSBlbHNlIGlmIChsYXN0V29yZFtsYXN0V29yZC5sZW5ndGggLSAxXSA9PT0gJ3MnKSB7XG4gICAgICAgIHJldHVybiBzaW5ndWxhckVudGl0eSArICdlcyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2luZ3VsYXJFbnRpdHkgKyAncyc7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=