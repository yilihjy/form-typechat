/**
* 由beforeBuild.js自动生成，不要手动修改 
*/
export const formSchemaString: string = `export type FormResponse = {
    formItems: (InputFormItem | RadioFormItem | CheckboxFormItem | SelectFormItem | UnknownFormItem)[]
}


/**
 * 表单项控件类型
 */
export type FormItemType = 'input' | 'radio' | 'checkbox' | 'select';

/**
 * 未知的表单控件
 */
export interface UnknownFormItem {
    itemType: 'unknown',
    /**
     * 未知的表单控件的描述
     */
    desc: string;
}

export interface FormItem {
    /**
     * 表单控件类型
     */
    itemType: FormItemType;
    /**
     * 表单数据模型的key名称
     */
    modelKeyName: string;
    /**
     * 表单数据模型的value的类型
     */
    modelValueType: 'string' | 'number' | 'Array<string>' | 'Array<number>';
    /**
     * 是否必填
     */
    required: boolean;
    /**
     * 表单的标签
     */
    label: string;
}

export interface FormItem {
    /**
     * 表单控件类型
     */
    itemType: FormItemType;
    /**
     * 表单数据模型的key名称
     */
    modelKeyName: string;
    /**
     * 表单数据模型的value的类型
     */
    modelValueType: 'string' | 'number' | 'Array<string>' | 'Array<number>';
    /**
     * 是否必填
     */
    required: boolean;
}

/**
 * 表单控件：Input 输入框
 * 通过鼠标或键盘输入字符
 */
export interface InputFormItem extends FormItem {
    itemType: 'input';
    modelValueType: 'string';
    /**
     * 表单校验：字符串最小长度
     */
    minLength: number | null;
    /**
     * 表单校验：字符串最大长度
     */
    maxLength: number | null;
    /**
     * 表单校验：字符串需要符合的正则表达式
     */
    pattern: string | null;
    /**
     * 默认值
     */
    default: string | null;
}

/**
 * 表单备选项
 */
export interface FormItemOption {
    /**
     * 选项标签
     */
    label: string;
    /**
     * 选项值
     */
    value: string | number;
}

/**
 * 表单控件：Radio 单选框
 * 在一组备选项中进行单选
 */
export interface RadioFormItem extends FormItem {
    itemType: 'radio';
    modelValueType: 'string' | 'number';
    /**
     * 默认值
     */
    default: string | number | null;
    /**
     * 备选选项
     */
    options: Array<FormItemOption>
}

/**
 * 表单控件：Checkbox  多选框
 * 在一组备选项中进行多选。
 */
export interface CheckboxFormItem extends FormItem {
    itemType: 'checkbox';
    modelValueType: 'Array<string>' | 'Array<number>';
    /**
     * 默认值
     */
    default: string | number | null;
    /**
     * 备选选项
     */
    options: Array<FormItemOption>
}

/**
 * 表单控件：Select 选择器
 * 当选项过多时，使用下拉菜单展示并选择内容。
 */
export interface SelectFormItem extends FormItem {
    itemType: 'select';
    /**
     * 单选为string
     * 多选为Array<string>
     */
    modelValueType: 'string' | 'Array<string>';
    /**
     * 是否多选
     */
    multiple: boolean;
    /**
     * 最少需要选几项
     */
    minItems: number | null;
    /**
     * 最多需要选几项
     */
    maxItems: number | null;
    /**
     * 备选选项
     */
    options: Array<FormItemOption>
}`;