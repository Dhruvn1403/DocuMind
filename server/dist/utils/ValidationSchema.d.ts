import z from 'zod';
export declare const signUpSchema: z.ZodObject<{
    name: z.ZodString;
    email_number: z.ZodUnion<readonly [z.ZodEmail, z.ZodString]>;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const signInSchema: z.ZodObject<{
    signInWith: z.ZodEnum<{
        credentials: "credentials";
        google: "google";
    }>;
    email_number: z.ZodOptional<z.ZodUnion<readonly [z.ZodEmail, z.ZodString]>>;
    password: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
export declare const googleLoginIdTokenSchema: z.ZodObject<{
    idToken: z.ZodString;
    userType: z.ZodString;
}, z.z.core.$strip>;
declare const documentationSlugSchema: z.ZodEnum<{
    stripe: "stripe";
    livekit: "livekit";
    firebase: "firebase";
    openai: "openai";
    nextjs: "nextjs";
}>;
export declare const createConversationSchema: z.ZodObject<{
    name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    documentation: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        stripe: "stripe";
        livekit: "livekit";
        firebase: "firebase";
        openai: "openai";
        nextjs: "nextjs";
    }>>>;
}, z.z.core.$strip>;
export declare const updateConversationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    documentation: z.ZodOptional<z.ZodEnum<{
        stripe: "stripe";
        livekit: "livekit";
        firebase: "firebase";
        openai: "openai";
        nextjs: "nextjs";
    }>>;
}, z.z.core.$strip>;
export { documentationSlugSchema };
export declare const createMessageSchema: z.ZodObject<{
    conversationId: z.ZodOptional<z.ZodString>;
    content: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    provider: z.ZodDefault<z.ZodEnum<{
        google: "google";
        openai: "openai";
        groq: "groq";
        anthropic: "anthropic";
    }>>;
    model: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    documentation: z.ZodOptional<z.ZodEnum<{
        stripe: "stripe";
        livekit: "livekit";
        firebase: "firebase";
        openai: "openai";
        nextjs: "nextjs";
    }>>;
    media: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        mimeType: z.ZodString;
        fileName: z.ZodOptional<z.ZodString>;
        mediaType: z.ZodOptional<z.ZodEnum<{
            image: "image";
            audio: "audio";
            video: "video";
            document: "document";
        }>>;
    }, z.z.core.$strip>>>>;
}, z.z.core.$strip>;
export declare const createScheduleItemSchema: z.ZodObject<{
    kind: z.ZodEnum<{
        reminder: "reminder";
        questionnaire: "questionnaire";
        appointment: "appointment";
    }>;
    title: z.ZodString;
    scheduledAt: z.z.ZodCoercedDate<unknown>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.z.core.$strip>;
//# sourceMappingURL=ValidationSchema.d.ts.map