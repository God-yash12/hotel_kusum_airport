
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';


export const databaseConfig = async (ConfigService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: ConfigService.get<string>('DATABASE_HOST')?.trim() || 'mysql',
    port: parseInt(ConfigService.get<string>('DATABASE_PORT') || '3306'),
    username: ConfigService.get<string>('DATABASE_USER')?.trim() || 'hotelkusum',
    password: ConfigService.get<string>('DATABASE_PASSWORD')?.trim() || 'hotelkusum',
    database: ConfigService.get<string>('DATABASE_NAME')?.trim() || 'hotel_kusum_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: ConfigService.get<string>('NODE_ENV') !== 'production',
})
