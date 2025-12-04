
import { Theme } from './types';

export const REFILL_CODE = 'ENIE2025';

export const THEMES: Theme[] = [
  {
    id: 'magazine',
    title: 'Christmas Attire & Red Satin',
    description: 'Christmas attire, red satin background. Professional lighting, happy expressions. Faces 100%. Suitable for individuals and groups.',
    imageUrl: 'https://picsum.photos/seed/redsatin/500/500',
    prompt: `Change the clothes of everyone in the photo to wear Christmas-themed attire. Maintain a luxurious red satin background. Apply professional lighting, shading, and sharpness to look like a high-end magazine photo. All subjects should have happy, joyful facial expressions. Crucially, preserve the original facial features of everyone with 100% accuracy. The text "ENIE christmas'x" must be elegantly displayed on the image. This theme applies to both individuals and groups.`
  },
  {
    id: 'studio',
    title: 'Enie Model Magazine Cover',
    description: 'High-fashion "Enie Model Magazine" cover. Dark background, studio lighting, happy faces. Faces 100%. Suitable for individuals and groups.',
    imageUrl: 'https://picsum.photos/seed/professionalsalon/500/500',
    prompt: `Generate a high-fashion magazine cover for "Enie Model Magazine". The subjects (whether individuals or a group) should be styled as professional models with happy expressions. Apply professional studio lighting, shading, and high sharpness, making the subjects stand out prominently against an elegant, dark background. The image can be half-body or full-body. Preserve the original facial features of all subjects with 100% accuracy. The text "ENIE christmas'x" must be visibly integrated into the magazine cover design.`
  },
  {
    id: 'student',
    title: 'Thai Student Christmas',
    description: 'Thai student uniform, red background, subtle decor. Professional look, happy smiles. Faces 100%. Suitable for individuals and groups.',
    imageUrl: 'https://picsum.photos/seed/thaistudent/500/500',
    prompt: `Transform all subjects in the photo into Thai students wearing standard Thai school uniforms. The background should be red with subtle Christmas decorations. Apply professional lighting and sharpness to ensure a high-quality look. All subjects should have happy, smiling expressions. Preserve the original facial features of everyone with 100% accuracy. The text "ENIE christmas'x" must be integrated naturally into the image. This theme is suitable for individuals and groups.`
  },
  {
    id: 'party',
    title: 'Enie Party Christmas',
    description: 'Happy poses, red Christmas shirts, props, red background. Professional lighting. Faces 100%. Suitable for individuals and groups.',
    imageUrl: 'https://picsum.photos/seed/party/500/500',
    prompt: `Transform all subjects in the photo to be posing happily. Everyone must be wearing red Christmas shirts and holding festive props. The background must be red. Apply professional lighting, deep shading, and sharpness. Preserve the original facial features of everyone with 100% accuracy. The text "ENIE Christmas'x" must be displayed on the background. Suitable for individuals and groups.`
  },
  {
    id: 'group_subtle',
    title: 'Group Red Christmas',
    description: 'Everyone in red shirts, red background. Professional lighting, happy faces. Faces 100%. Suitable for individuals and groups.',
    imageUrl: 'https://picsum.photos/seed/groupsubtle/500/500',
    prompt: `Transform the people in the photo (whether an individual or a group). Change everyone's clothes to red shirts. The background must be a festive red. Apply professional studio lighting, shading, and sharpness to ensure a high-quality look. The subjects should have happy, joyful expressions. Preserve the original facial features of everyone with 100% accuracy. The text "ENIE christmas'x" must be displayed on the image.`
  }
];