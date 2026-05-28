import { addProcessor, getValueSync } from '../../../../../lib/util/registry.js';
import { ValidatorManager } from '../../../../../lib/util/validator.js';
const initialValidators = [
    {
        id: 'fullNameNotEmpty',
        /**
     *
     * @param {Address} address
     * @returns {boolean}
     */ func: (address)=>{
            if (!address.full_name || address.full_name.trim() === '') {
                return false;
            } else {
                return true;
            }
        },
        errorMessage: 'Full name is required'
    },
    {
        id: 'address1NotEmpty',
        /**
     *
     * @param {Address} address
     * @returns {boolean}
     */ func: (address)=>{
            if (!address.address_1 || address.address_1.trim() === '') {
                return false;
            } else {
                return true;
            }
        },
        errorMessage: 'Address is required'
    },
    {
        id: 'provinceNotEmpty',
        /**
     *
     * @param {Address} address
     * @returns {boolean}
     */ func: (address)=>{
            if (!address.province || address.province.trim() === '') {
                return false;
            } else {
                return true;
            }
        },
        errorMessage: 'Province is required'
    },
    {
        id: 'countryNotEmpty',
        /**
     *
     * @param {Address} address
     * @returns {boolean}
     */ func: (address)=>{
            if (!address.country || address.country.trim() === '') {
                return false;
            } else {
                return true;
            }
        },
        errorMessage: 'Country is required'
    },
    {
        id: 'postcodeNotEmpty',
        /**
     *
     * @param {Address} address
     * @returns {boolean}
     */ func: (address)=>{
            if (!address.postcode || address.postcode.trim() === '') {
                return false;
            } else {
                return true;
            }
        },
        errorMessage: 'Postcode is required'
    }
];
export function validateAddress(address) {
    const validator = getValueSync('addressValidator', ()=>new ValidatorManager(initialValidators), {}, (value)=>value instanceof ValidatorManager);
    return validator.validateSync(address);
}
export function addAddressValidationRule(rule) {
    addProcessor('addressValidator', (validatorManager)=>{
        if (validatorManager instanceof ValidatorManager) {
            validatorManager.add(rule);
            return validatorManager;
        } else {
            throw new Error('addressValidator must be an instance of ValidatorManager');
        }
    });
}
